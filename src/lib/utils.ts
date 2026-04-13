import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
// make a url for doctor avatar image
type Gender = "MALE" | "FEMALE" | "NON_BINARY" | "OTHER" | "PREFER_NOT_TO_SAY";
export function getAvatarUrl(name: string, gender: Gender) {
	const safeName = encodeURIComponent(name || "user");
	const iranBase =
		gender === "FEMALE" ? "girl" : gender === "MALE" ? "boy" : "";
	const iranUrl = `https://avatar.iran.liara.run/public/${iranBase}?username=${safeName}`;
	const fallback = `https://api.dicebear.com/7.x/initials/svg?seed=${safeName}`;
	return fallback;
}
//make phone number in Indian standard
export function formatIndianPhoneNumber(value: string | number): string {
	const digits = value.toString().replace(/\D/g, "");
	if (digits.length <= 5) return digits;
	return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
}