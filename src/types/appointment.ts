export type TransformedAppointment = {
  id: string;
  date: string;
  time: string;
  status: "CONFIRMED" | "COMPLETED";
  reason: string | null;

  patientName: string;
  patientEmail: string;

  doctorName: string;
  doctorImageUrl: string;
};