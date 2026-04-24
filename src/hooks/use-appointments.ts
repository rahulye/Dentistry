"use client";
import {
	bookAppointment,
	getAppointments,
	getBookedTimeSlots,
	getUserAppointments,
	updateAppointmentStatus,
} from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//fetch appointment
const useGetAppointments = () => {
	const result = useQuery({
		queryKey: ["getAppointments"],
		queryFn: getAppointments,
	});
	return result;
};
//get booked appointments
const useBookedTimeSlots = (doctorId: string, date: string) => {
	return useQuery({
		queryKey: ["getBookedTimeSlots"],
		queryFn: () => getBookedTimeSlots(doctorId!, date),
		enabled: !!doctorId && !!date, // only run query if both doctorId and date are provided
	});
};
//booking appointments
const useBookAppointment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: bookAppointment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
			queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
		},
		onError: (err) => console.error("Failed to book appointment:", err),
	});
};
// get user booked appointments
export function useUserAppointments() {
	const result = useQuery({
		queryKey: ["getUserAppointments"],
		queryFn: getUserAppointments,
	});
	return result;
}
// update and view booked appointments
const useUpdateAppointmentStatus = () => {
	const queryClient = useQueryClient();
	const result = useMutation({
		mutationFn: updateAppointmentStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
		},
		onError: (err) => console.error("Failed to update appointment:", err),
	});
	return result;
};
export {
	useGetAppointments,
	useBookedTimeSlots,
	useBookAppointment,
	useUpdateAppointmentStatus,
};
