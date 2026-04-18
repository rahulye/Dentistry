"use client";
import {
	bookAppointment,
	getAppointments,
	getBookedTimeSlots,
	getUserAppointments,
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
		},
		onError: (err) => console.error("Failed to book appointment:", err),
	});
}
// get user booked appointments
export function useUserAppointments() {
  const result = useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
  return result;
}
// // update and view booked appointments
// const useUpdateAppointmentStatus = () => {

// }
export { useGetAppointments, useBookedTimeSlots , useBookAppointment};