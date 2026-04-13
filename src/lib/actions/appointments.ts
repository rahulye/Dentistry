"use server";
import { prisma } from "../prisma";
//to fetch appointments with user, doctor
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

export { getAppointments };
