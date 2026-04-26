"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus } from "@prisma/client";
import {
	AppointmentWithUserAndDoctor,
	TransformedAppointment,
} from "@/types/appointment";

/* -------------------------------------------------------------------------- */
/*                             TRANSFORMER                                    */
/* -------------------------------------------------------------------------- */

const transformAppointment = (
	appointment: AppointmentWithUserAndDoctor,
): TransformedAppointment => {
	return {
		id: appointment.id,
		date: appointment.date.toISOString().split("T")[0] ?? "",
		time: appointment.time,
		duration: appointment.duration,
		status: appointment.status,
		reason: appointment.reason ?? "",
		notes: appointment.notes ?? "",
		createdAt: appointment.createdAt.toISOString(),
		updatedAt: appointment.updatedAt.toISOString(),

		patientName: `${appointment.user.firstName ?? ""} ${
			appointment.user.lastName ?? ""
		}`.trim(),
		patientEmail: appointment.user.email,

		doctorName: appointment.doctor.name,
		doctorImageUrl: appointment.doctor.imageURL ?? "",
	};
};

/* -------------------------------------------------------------------------- */
/*                           GET USER APPOINTMENTS                             */
/* -------------------------------------------------------------------------- */

const getUserAppointments = async (): Promise<TransformedAppointment[]> => {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error("You must be logged in");
		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
		});
		if (!user) throw new Error("User not found");
		const appointments = await prisma.appointment.findMany({
			where: { userId: user.id },
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
			orderBy: [{ date: "asc" }, { time: "asc" }],
		});

		return appointments.map(transformAppointment);
	} catch (err) {
		console.error("Error fetching user appointments:", err);
		throw new Error("Failed to fetch user appointments");
	}
};

/* -------------------------------------------------------------------------- */
/*                           GET ALL APPOINTMENTS (ADMIN)                      */
/* -------------------------------------------------------------------------- */

const getAppointments = async (): Promise<TransformedAppointment[]> => {
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

		return appointments.map(transformAppointment);
	} catch (err) {
		console.error("Error fetching appointments:", err);
		throw new Error("Failed to fetch appointments");
	}
};

/* -------------------------------------------------------------------------- */
/*                         USER APPOINTMENT STATS                              */
/* -------------------------------------------------------------------------- */

const getUserAppointmentsStats = async () => {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error("Unauthorized");

		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
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
		console.error("Error fetching appointment stats:", err);
		throw new Error("Failed to fetch appointment stats");
	}
};

/* -------------------------------------------------------------------------- */
/*                          BOOKED TIME SLOTS                                  */
/* -------------------------------------------------------------------------- */

const getBookedTimeSlots = async (
	doctorId: string,
	date: string,
): Promise<string[]> => {
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

		return appointments.map((a) => a.time);
	} catch (err) {
		console.error("Error fetching booked slots:", err);
		return [];
	}
};

/* -------------------------------------------------------------------------- */
/*                            BOOK APPOINTMENT                                 */
/* -------------------------------------------------------------------------- */

interface BookAppointmentInput {
	doctorId: string;
	date: string;
	time: string;
	reason?: string;
}

const bookAppointment = async (
	input: BookAppointmentInput,
): Promise<TransformedAppointment> => {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error("Unauthorized");

		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
		});

		if (!user) throw new Error("User not found");

		const appointment = await prisma.appointment.create({
			data: {
				userId: user.id,
				doctorId: input.doctorId,
				date: new Date(input.date),
				time: input.time,
				reason: input.reason ?? "General consultation",
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
				doctor: {
					select: {
						name: true,
						imageURL: true,
						gender: true,
					},
				},
			},
		});

		return transformAppointment(appointment);
	} catch (err) {
		console.error("Error booking appointment:", err);
		throw new Error("Failed to book appointment");
	}
};

/* -------------------------------------------------------------------------- */
/*                        UPDATE APPOINTMENT STATUS                             */
/* -------------------------------------------------------------------------- */

const updateAppointmentStatus = async (input: {
	id: string;
	status: AppointmentStatus;
}) => {
	try {
		return await prisma.appointment.update({
			where: { id: input.id },
			data: { status: input.status },
		});
	} catch (err) {
		console.error("Error updating appointment status:", err);
		throw new Error("Failed to update appointment status");
	}
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORTS                                   */
/* -------------------------------------------------------------------------- */

export {
	getAppointments,
	getUserAppointments,
	getUserAppointmentsStats,
	getBookedTimeSlots,
	bookAppointment,
	updateAppointmentStatus,
};

// caused many type errors below

// "use server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "../prisma";
// import {
// 	AppointmentStatus,
// } from "../../../prisma/generated/client";
// const transformAppointment = (appointment: any) => {
// 	return {
// 		...appointment,
// 		patientName:
// 			`${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
// 		patientEmail: appointment.user.email,
// 		doctorName: appointment.doctor.name,
// 		doctorImageUrl: appointment.doctor.imageURL || "",
// 		date: appointment.date.toISOString().split("T")[0],
// 	};
// };
// //get user specific apointments
// const getUserAppointments = async () => {
// 	try {
// 		const { userId } = await auth();
// 		if (!userId) throw new Error("You must be logged in to view appointments");
// 		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
// 		if (!user)
// 			throw new Error(
// 				"User not found. Please ensure your account is properly set up.",
// 			);
// 		const appointments = await prisma.appointment.findMany({
// 			where: { userId: user.id },
// 			include: {
// 				user: { select: { firstName: true, lastName: true, email: true } },
// 				doctor: { select: { name: true, imageURL: true } },
// 			},
// 			orderBy: [{ date: "asc" }, { time: "asc" }],
// 		});
// 		return appointments.map(transformAppointment);
// 	} catch (err) {
// 		console.error(
// 			"Error while getting user specific appointments from DB: ",
// 			err,
// 		);
// 		throw new Error("Failed to fetch the user specific appointments from DB");
// 	}
// };
// //to fetch all appointments with user, doctor fields
// const getAppointments = async () => {
// 	try {
// 		const appointments = await prisma.appointment.findMany({
// 			include: {
// 				user: {
// 					select: {
// 						firstName: true,
// 						lastName: true,
// 						email: true,
// 					},
// 				},
// 				doctor: {
// 					select: {
// 						name: true,
// 						imageURL: true,
// 						gender: true,
// 					},
// 				},
// 			},
// 			orderBy: {
// 				createdAt: "desc",
// 			},
// 		});
//     return appointments.map(transformAppointment);
// 	} catch (err) {
// 		console.error("Error while getting appointments from DB ", err);
// 		throw new Error("Failed to fetch the appointments from DB");
// 	}
// };
// //fetch user appointments stats
// const getUserAppointmentsStats = async () => {
// 	try {
// 		const { userId } = await auth();
// 		if (!userId) throw new Error("You must me authenticated");
// 		const user = await prisma.user.findUnique({
// 			where: {
// 				clerkId: userId,
// 			},
// 		});
// 		if (!user) throw new Error("User not found");
// 		const [totalCount, completedCount] = await Promise.all([
// 			prisma.appointment.count({
// 				where: { userId: user.id },
// 			}),
// 			prisma.appointment.count({
// 				where: {
// 					userId: user.id,
// 					status: "COMPLETED",
// 				},
// 			}),
// 		]);
// 		return {
// 			totalAppointments: totalCount,
// 			completedAppointments: completedCount,
// 		};
// 	} catch (err) {
// 		console.error("Error while getting user appointments from DB ", err);
// 		throw new Error("Failed to fetch the user appointments from DB");
// 	}
// };
// //get already booked time slots
// const getBookedTimeSlots = async (doctorId: string, date: string) => {
// 	try {
// 		const appointments = await prisma.appointment.findMany({
// 			where: {
// 				doctorId,
// 				date: new Date(date),
// 				status: {
// 					in: ["CONFIRMED", "COMPLETED"],
// 				},
// 			},
// 			select: { time: true },
// 		});
// 		return appointments.map((appointment) => appointment.time);
// 	} catch (err) {
// 		console.error("Error while getting booked appointments from DB ", err);
// 		return [];
// 	}
// };
// //book an appointment
// interface BookAppointmentInput {
// 	doctorId: string | null;
// 	date: string;
// 	time: string;
// 	reason?: string;
// }
// const bookAppointment = async (input: BookAppointmentInput) => {
// 	try {
// 		const { userId } = await auth();
// 		if (!userId)
// 			throw new Error("You must me logged in to book an appointment");
// 		if (!input.doctorId || !input.date || !input.time) {
// 			throw new Error("Doctor, date, and time are required");
// 		}
// 		const user = await prisma.user.findUnique({
// 			where: {
// 				clerkId: userId,
// 			},
// 		});
// 		if (!user) throw new Error("User not found");
// 		const appointment = await prisma.appointment.create({
// 			data: {
// 				userId: user.id,
// 				doctorId: input.doctorId,
// 				date: new Date(input.date),
// 				time: input.time,
// 				reason: input.reason || "General consultation",
// 				status: "CONFIRMED",
// 			},
// 			include: {
// 				user: {
// 					select: {
// 						firstName: true,
// 						lastName: true,
// 						email: true,
// 					},
// 				},
// 				doctor: { select: { name: true, imageURL: true } },
// 			},
// 		});
// 		return transformAppointment(appointment);
// 	} catch (err) {
// 		console.error("Error while booking an appointment to DB ", err);
// 		throw new Error("Failed to booking an appointment to DB");
// 	}
// };
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
// export {
// 	getAppointments,
// 	getUserAppointmentsStats,
// 	getUserAppointments,
// 	getBookedTimeSlots,
// 	bookAppointment,
// 	updateAppointmentStatus,
// };
