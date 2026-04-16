"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
const transformAppointment = (appointment: any) => {
	return {
		...appointment,
		patientName:
			`${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
		patientEmail: appointment.user.email,
		doctorName: appointment.doctor.name,
		doctorImageUrl: appointment.doctor.imageUrl || "",
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
	} catch (error) {
		console.error("Error while getting user specific appointments from DB: ", error);
		throw new Error("Failed to fetch the user specific appointments from DB");
	}
};
//to fetch all appointments with user, doctor rfields
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

export { getAppointments, getUserAppointmentsStats , getUserAppointments };
