export type GenderType =
  | "MALE"
  | "FEMALE"
  | "NON_BINARY"
  | "OTHER"
  | "PREFER_NOT_TO_SAY";

export type Doctor = {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	imageURL: string | null;
	gender: GenderType;
	speciality: string | null;
	bio: string | null;
	isActive: boolean;
	appointmentCount: number;
	createdAt: string;
	updatedAt: string;
};
