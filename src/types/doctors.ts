import { Gender } from "@prisma/client";

export type Doctor = {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	imageURL: string | null;
	gender: Gender;
	speciality: string | null;
	bio: string | null;
	isActive: boolean;
	appointmentCount: number;
	createdAt: string;
	updatedAt: string;
};