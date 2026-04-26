"use server";
import { revalidatePath } from "next/cache";
import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { getAvatarUrl } from "../utils";
//Fetch doctors with appointment count
const getDoctors = async () => {
	try {
		const doctors = await prisma.doctor.findMany({
			include: {
				_count: {
					select: {
						appointments: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return doctors.map((doctor) => {
			return {
				...doctor,
				appointmentCount: doctor._count.appointments,
				createdAt: doctor.createdAt.toISOString(),
				updatedAt: doctor.updatedAt.toISOString(),
			};
		});
	} catch (err) {
		console.error("Error while getting doctors from DB ", err);
		throw new Error("Failed to fetch the doctors from DB");
	}
};
//Create a doctor field
interface doctorDataProps {
	name: string;
	email: string;
	gender: Gender;
	phone: string | undefined;
	speciality: string | undefined;
	isActive: boolean;
}
const createDoctor = async (input: doctorDataProps) => {
	try {
		if (!input.name || !input.email)
			throw new Error("Name and Email field are required");
		const doctor = await prisma.doctor.create({
			data: {
				...input,
				imageURL: getAvatarUrl(input.name, input.gender),
			},
			include: {
				_count: {
					select: { appointments: true },
				},
			},
		});
		revalidatePath("/admin");
		return {
			...doctor,
			appointmentCount: doctor._count.appointments,
			createdAt: doctor.createdAt.toISOString(),
			updatedAt: doctor.updatedAt.toISOString(),
		};
	} catch (err) {
		console.error("Error while creating doctors to DB ", err);
		throw new Error("Failed to create doctors to DB");
	}
};
// update doctor field
interface updateDoctorDataProps extends Partial<doctorDataProps> {
	id: string;
}
const updateDoctor = async (input: updateDoctorDataProps) => {
	try {
		if (!input.name || !input.email)
			throw new Error("Name and Email are required");
		const currentDoctor = await prisma.doctor.findUnique({
			where: {
				id: input.id,
			},
			select: {
				email: true,
			},
		});
		if (!currentDoctor) throw new Error("Doctor not Found");
		if (input.email !== currentDoctor.email) {
			const existingDoctor = await prisma.doctor.findUnique({
				where: { email: input.email },
			});

			if (existingDoctor) {
				throw new Error("A doctor with this email already exists");
			}
		}
		const doctor = await prisma.doctor.update({
			where: { id: input.id },
			data: {
				name: input.name,
				email: input.email,
				phone: input.phone,
				speciality: input.speciality,
				gender: input.gender,
				isActive: input.isActive,
			},
			include: {
				_count: {
					select: { appointments: true },
				},
			},
		});
		return {
			...doctor,
			appointmentCount: doctor._count.appointments,
			createdAt: doctor.createdAt.toISOString(),
			updatedAt: doctor.updatedAt.toISOString(),
		};
	} catch (err) {
		console.error("Error while updating doctors to DB ", err);
		throw new Error("Failed to update doctors to DB");
	}
};
// delete doctor field
const deleteDoctor = async (id: string) => {
	try {
		await prisma.doctor.delete({
			where: { id },
		});

		revalidatePath("/admin");
		return { success: true };
	} catch (err) {
		console.error("Error while deleting doctor", err);
		throw new Error("Failed to delete doctor");
	}
};
//get available doctors right now
const getAvailableDoctors = async () => {
	try {
		const doctors = await prisma.doctor.findMany({
			where: { isActive: true },
			include: {
				_count: {
					select: { appointments: true },
				},
			},
			orderBy: { name: "asc" },
		});
		return doctors.map((doctor) => ({
			...doctor,
			appointmentCount: doctor._count.appointments,
			createdAt: doctor.createdAt.toISOString(),
			updatedAt: doctor.updatedAt.toISOString(),
		}));
	} catch (error) {
		console.error("Error fetching available doctors ", error);
		throw new Error("Failed to fetch available doctors");
	}
};
export {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
	getAvailableDoctors,
};
