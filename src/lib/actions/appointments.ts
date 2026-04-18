"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus } from "../../../prisma/generated/client";
const transformAppointment = (appointment: any) => {
	return {
		...appointment,
		patientName:
			`${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
		patientEmail: appointment.user.email,
		doctorName: appointment.doctor.name,
		doctorImageUrl: appointment.doctor.imageURL || "",
		date: appointment.date.toISOString().split("T")[0],
	};
};
//get user specific apointments
const getUserAppointments = async () => {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error("You must be logged in to view appointments");
		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
		if (!user)
			throw new Error(
				"User not found. Please ensure your account is properly set up.",
			);
		const appointments = await prisma.appointment.findMany({
			where: { userId: user.id },
			include: {
				user: { select: { firstName: true, lastName: true, email: true } },
				doctor: { select: { name: true, imageURL: true } },
			},
			orderBy: [{ date: "asc" }, { time: "asc" }],
		});
		return appointments.map(transformAppointment);
	} catch (err) {
		console.error(
			"Error while getting user specific appointments from DB: ",
			err,
		);
		throw new Error("Failed to fetch the user specific appointments from DB");
	}
};
//to fetch all appointments with user, doctor fields
const getAppointments = async () => {
	try {
		const appointments = await prisma.appointment.findMany({
			include: {
				user: {
					select: {
						firstName: true,
						lastName: true,
						email: true,
					},
				},
				doctor: {
					select: {
						name: true,
						imageURL: true,
						gender: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return appointments;
	} catch (err) {
		console.error("Error while getting appointments from DB ", err);
		throw new Error("Failed to fetch the appointments from DB");
	}
};
//fetch user appointments stats
const getUserAppointmentsStats = async () => {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error("You must me authenticated");
		const user = await prisma.user.findUnique({
			where: {
				clerkId: userId,
			},
		});
		if (!user) throw new Error("User not found");
		const [totalCount, completedCount] = await Promise.all([
			prisma.appointment.count({
				where: { userId: user.id },
			}),
			prisma.appointment.count({
				where: {
					userId: user.id,
					status: "COMPLETED",
				},
			}),
		]);
		return {
			totalAppointments: totalCount,
			completedAppointments: completedCount,
		};
	} catch (err) {
		console.error("Error while getting user appointments from DB ", err);
		throw new Error("Failed to fetch the user appointments from DB");
	}
};
//get already booked time slots
const getBookedTimeSlots = async (doctorId: string, date: string) => {
	try {
		const appointments = await prisma.appointment.findMany({
			where: {
				doctorId,
				date: new Date(date),
				status: {
					in: ["CONFIRMED", "COMPLETED"],
				},
			},
			select: { time: true },
		});
		return appointments.map((appointment) => appointment.time);
	} catch (err) {
		console.error("Error while getting booked appointments from DB ", err);
		return [];
	}
};
//book an appointment
interface BookAppointmentInput {
	doctorId: string | null;
	date: string;
	time: string;
	reason?: string;
}
const bookAppointment = async (input: BookAppointmentInput) => {
	try {
		const { userId } = await auth();
		if (!userId)
			throw new Error("You must me logged in to book an appointment");
		if (!input.doctorId || !input.date || !input.time) {
			throw new Error("Doctor, date, and time are required");
		}
		const user = await prisma.user.findUnique({
			where: {
				clerkId: userId,
			},
		});
		if (!user) throw new Error("User not found");
		const appointment = await prisma.appointment.create({
			data: {
				userId: user.id,
				doctorId: input.doctorId,
				date: new Date(input.date),
				time: input.time,
				reason: input.reason || "General consultation",
				status: "CONFIRMED",
			},
			include: {
				user: {
					select: {
						firstName: true,
						lastName: true,
						email: true,
					},
				},
				doctor: { select: { name: true, imageURL: true } },
			},
		});
		console.log(appointment);
		return transformAppointment(appointment);
	} catch (err) {
		console.error("Error while booking an appointment to DB ", err);
		throw new Error("Failed to booking an appointment to DB");
	}
};
// const updateAppointmentStatus = async (input: {
// 	id: string;
// 	status: AppointmentStatus;
// }) => {
// 	try {
// 		const appointment = await prisma.appointment.update({
// 			where: { id: input.id },
// 			data: { status: input.status },
// 		});
// 		return appointment;
// 	} catch (err) {
// 		console.error("Error while updating the appointment status from DB ", err);
// 		throw new Error("Failed to updating the appointment status from DB");
// 	}
// };
export {
	getAppointments,
	getUserAppointmentsStats,
	getUserAppointments,
	getBookedTimeSlots,
	bookAppointment,
	// updateAppointmentStatus,
};
