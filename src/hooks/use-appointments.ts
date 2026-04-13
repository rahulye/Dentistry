"use client"
import { getAppointments } from '@/lib/actions/appointments'
import { useQuery } from '@tanstack/react-query'
//fetch appointment
const useGetAppointments = () => {
 const result = useQuery({
  queryKey:["getAppointments"],
  queryFn:getAppointments
 }) 
 return result
}

export {useGetAppointments}
