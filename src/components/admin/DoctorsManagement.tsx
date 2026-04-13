import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { EditIcon, MailIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { Empty, EmptyTitle } from "../ui/empty";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "../../../prisma/generated/browser";
const DoctorsManagement = () => {
	const { data: doctors = [] } = useGetDoctors();
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isAddEditOpen, setIsAddEditOpen] = useState(false);
	const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
	const handleEditDoctor = (doctor: Doctor) => {
		setIsAddEditOpen(true);
		setSelectedDoctor(doctor);
	};
	const handleCloseEditDialog = () => {
		setIsAddEditOpen(false);
		setSelectedDoctor(null);
	};
	return (
		<div className="max-w-7xl mx-auto">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
					<CardAction>
						<Button
							className="text-muted bg-primary"
							onClick={() => setIsAddDialogOpen(true)}
						>
							<PlusIcon className="size-5"></PlusIcon>
							<span>Add Doctors</span>
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					{doctors.length === 0 ? (
						<Empty>
							<EmptyTitle className="text-lg font-semibold">
								No doctors available
							</EmptyTitle>
							<p className="text-sm text-muted-foreground text-center max-w-sm">
								Doctors you add will appear here, making it easy to manage
								appointments and availability.
							</p>
						</Empty>
					) : (
						doctors.map((doctor) => (
							<div
								key={doctor.id}
								className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
							>
								<div className="flex items-center gap-4">
									<Image
										src={doctor.imageURL!}
										alt={`${doctor.name}-profile-image`}
										width={48}
										height={48}
										className="size-12 rounded-full object-cover ring-2 ring-background"
									/>
									<div>
										<div className="font-semibold">{doctor.name}</div>
										<div className="text-sm text-muted-foreground">
											{doctor.speciality}
											<span className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">
												{doctor.gender.toLowerCase()}
											</span>
										</div>
										<div className="flex items-center gap-4 mt-1">
											<div className="flex items-center gap-1 text-xs text-muted-foreground">
												<MailIcon className="h-3 w-3" />
												{doctor.email}
											</div>
											<div className="flex items-center gap-1 text-xs text-muted-foreground">
												<PhoneIcon className="h-3 w-3" />
												{doctor.phone}
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="text-center">
										<div className="font-semibold text-primary">
											{doctor.appointmentCount}
										</div>
										<div className="text-xs text-muted-foreground">
											Appointments
										</div>
									</div>
									{doctor.isActive ? (
										<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
											Active
										</Badge>
									) : (
										<Badge variant="secondary">Inactive</Badge>
									)}
									<Button
										size="sm"
										variant="outline"
										className="h-8 px-3"
										onClick={() => handleEditDoctor(doctor)}
									>
										<EditIcon className="size-4 mr-1" />
										Edit
									</Button>
								</div>
							</div>
						))
					)}
				</CardContent>
			</Card>
			<AddDoctorDialog
				isOpen={isAddDialogOpen}
				onClose={() => setIsAddDialogOpen(false)}
			/>
			<EditDoctorDialog
				key={selectedDoctor?.id}
				isOpen={isAddEditOpen}
				onClose={handleCloseEditDialog}
				doctor={selectedDoctor}
			/>
		</div>
	);
};

export default DoctorsManagement;
