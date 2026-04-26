import { useCreateDoctor } from "@/hooks/use-doctors";
import { formatIndianPhoneNumber } from "@/lib/utils";
import { useState } from "react";
import { GenderType } from "@/types/doctors";
import { Dialog, DialogTitle, DialogDescription,  } from "../ui/dialog";
import { DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { SelectContent,Select, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface AddDoctorDialogProps {
	isOpen: boolean;
	onClose: () => void;
}
const AddDoctorDialog = ({ isOpen, onClose }: AddDoctorDialogProps) => {
	const [newDoctor, setNewDoctor] = useState({
		name: "",
		email: "",
		speciality: "",
		phone: "",
		gender: "MALE" as GenderType,
		isActive: true,
	});
	const createDoctorMutation = useCreateDoctor();
	const handleSave = () => {
		createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose });
	};
	const handleClose = () => {
		onClose();
		setNewDoctor({
			name: "",
			email: "",
			speciality: "",
			phone: "",
			gender: "MALE",
			isActive: true,
		});
	};
	const handlePhoneChange = (value: string) => {
		const formattedNumber = formatIndianPhoneNumber(value);
		setNewDoctor({ ...newDoctor, phone: formattedNumber });
	};
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-125">
				<DialogHeader>
					<DialogTitle>Add New Doctor</DialogTitle>
					<DialogDescription>
						Add a new doctor to your practice.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="new-name">Name *</Label>
							<Input
								id="new-name"
								value={newDoctor.name}
								onChange={(e) =>
									setNewDoctor({ ...newDoctor, name: e.target.value })
								}
								placeholder="Dr. Swarna Ramesh"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="new-speciality">Speciality *</Label>
							<Input
								id="new-speciality"
								value={newDoctor.speciality}
								onChange={(e) =>
									setNewDoctor({ ...newDoctor, speciality: e.target.value })
								}
								placeholder="General Dentistry"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-email">Email *</Label>
						<Input
							id="new-email"
							type="email"
							value={newDoctor.email}
							onChange={(e) =>
								setNewDoctor({ ...newDoctor, email: e.target.value })
							}
							placeholder="doctor@example.com"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-phone">Phone</Label>
						<Input
							id="new-phone"
							value={newDoctor.phone}
							onChange={(e) => handlePhoneChange(e.target.value)}
							placeholder="12345 67890"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="new-gender">Gender</Label>
							<Select
								value={newDoctor.gender || ""}
								onValueChange={(value) =>
									setNewDoctor({ ...newDoctor, gender: value as GenderType })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MALE">Male</SelectItem>
									<SelectItem value="FEMALE">Female</SelectItem>
									<SelectItem value="NON_BINARY">Non Binary</SelectItem>
									<SelectItem value="OTHER">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="new-status">Status</Label>
							<Select
								value={newDoctor.isActive ? "active" : "inactive"}
								onValueChange={(value) =>
									setNewDoctor({ ...newDoctor, isActive: value === "active" })
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className="bg-primary hover:bg-primary/90"
						disabled={
							!newDoctor.name ||
							!newDoctor.email ||
							!newDoctor.speciality ||
							createDoctorMutation.isPending
						}
					>
						{createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddDoctorDialog;
