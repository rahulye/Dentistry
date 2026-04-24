"use client";
import Adminstats from "@/components/admin/Adminstats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointments";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import type { Doctor } from "@prisma/client";
import { SettingsIcon } from "lucide-react";
const AdminDashboard = () => {
	const { user } = useUser();
	const { data: doctors = [], isLoading: isDoctorsLoading } = useGetDoctors();
	const { data: appointments = [], isLoading: isAppointmentLoading } =
		useGetAppointments();
	const stats = {
		totalDoctors: doctors.length,
		totalAppointments: appointments.length,
		activeDoctors: doctors.filter((doctor:Doctor) => doctor.isActive).length,
		completedAppointments: appointments.filter(
			(appointment) => appointment.status === "COMPLETED",
		).length,
	};
	if (isDoctorsLoading || isAppointmentLoading) return <LoadingSpinner />;
	return (
		<div className="bg-background min-h-screen">
			<Navbar />
			<div className="max-w-7xl mx-auto px-6 py-8 pt-24">
				{/* welcome section */}
				<div className="mb-12 flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
					<div className="space-y-4">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
							<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
							<span className="text-sm font-medium text-primary ">
								Admin Dashboard
							</span>
						</div>
						<div>
							<h1 className="text-4xl font-bold mb-2">
								Welcome back, {user?.firstName || "Admin"}!
							</h1>
							<p className="text-muted-foreground">
								Manage doctors, oversee appointments, and monitor your dental
								practice performance.
							</p>
						</div>
					</div>
					<div className="hidden lg:block">
						<div className="w-32 h-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
							<SettingsIcon className="w-16 h-16 text-primary" />
						</div>
					</div>
				</div>
				<Adminstats
					totalDoctors={stats.totalDoctors}
					activeDoctors={stats.activeDoctors}
					totalAppointments={stats.totalAppointments}
					completedAppointments={stats.completedAppointments}
				/>
				<DoctorsManagement />
				<RecentAppointments />
			</div>
		</div>
	);
};

export default AdminDashboard;
