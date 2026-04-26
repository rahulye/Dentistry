import { AppointmentStatus, Prisma } from "@prisma/client";

export type AppointmentWithUserAndDoctor =
  Prisma.AppointmentGetPayload<{
    include: {
      user: {
        select: {
          firstName: true;
          lastName: true;
          email: true;
        };
      };
      doctor: {
        select: {
          name: true;
          imageURL: true;
          gender: true;
        };
      };
    };
  }>;
  
export type TransformedAppointment = {
  id: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  reason: string ;
  notes: string;
  createdAt: string;
  updatedAt: string;

  patientName: string;
  patientEmail: string;

  doctorName: string;
  doctorImageUrl: string;
};

export type AppointmentStatusType = "CONFIRMED" | "COMPLETED";