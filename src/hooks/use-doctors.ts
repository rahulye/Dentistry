"use client";

import {
	createDoctor,
	deleteDoctor,
	getAvailableDoctors,
	getDoctors,
	updateDoctor,
} from "@/lib/actions/doctors";
import type { Doctor } from "@/types/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//get doctors
const useGetDoctors = () => {
	const result = useQuery<Doctor[]>({
		queryKey: ["getDoctors"],
		queryFn: getDoctors,
	});
	return result;
};
//create doctors
const useCreateDoctor = () => {
	const queryCLient = useQueryClient();
	const result = useMutation({
		mutationFn: createDoctor,
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: ["getDoctors"] });
		},
		onError: (err) => {
			console.error("Error while create a doctor field", err);
		},
	});
	return result;
};
//update doctors
const useUpdateDoctor = () => {
	const queryCLient = useQueryClient();
	const result = useMutation({
		mutationFn: updateDoctor,
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: ["getDoctors"] });
			queryCLient.invalidateQueries({ queryKey: ["getAvailableDoctors"] });
		},
		onError: (err) => {
			console.error("Error while update a doctor field", err);
		},
	});
	return result;
};
//delete doctor
const useDeleteDoctor = () => {
	const queryClient = useQueryClient();
	const result = useMutation({
		mutationFn: deleteDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
		},
		onError: (err) => {
			console.error("Error while deleting doctor", err);
		},
	});
	return result;
};
//get avaoilable doctors right now
const useAvailableDoctors = () => {
	const result = useQuery({
		queryKey:["getAvailableDoctors"],
		queryFn:getAvailableDoctors
	})
	return result;
}
export { useGetDoctors, useCreateDoctor, useUpdateDoctor, useDeleteDoctor , useAvailableDoctors };
