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
//appointment types
export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$30" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$60" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$25" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$100" },
];
//get next 5 days
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};
//show the time slots
export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};