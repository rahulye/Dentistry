import { useState } from "react";
import { Doctor } from "@/types/doctors";
import {
	Dialog,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogContent,
} from "../ui/dialog";
import { formatIndianPhoneNumber } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useDeleteDoctor, useUpdateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
interface EditDoctorDialogProps {
	isOpen: boolean;
	onClose: () => void;
	doctor: Doctor | null;
}
const EditDoctorDialog = ({
	doctor,
	isOpen,
	onClose,
}: EditDoctorDialogProps) => {
	const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);
	const handleClose = () => {
		onClose();
		setEditingDoctor(null);
	};
	const handlePhoneChange = (value: string) => {
		const formattedPhoneNumber = formatIndianPhoneNumber(value);
		if (editingDoctor) {
			setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
		}
	};
	const deleteDoctorMutation = useDeleteDoctor();
	const handleDelete = () => {
		if (!editingDoctor?.id) return;
		const confirmed = confirm(
			`Are you sure you want to delete Dr. ${editingDoctor.name}?`,
		);
		if (!confirmed) return;
		deleteDoctorMutation.mutate(editingDoctor.id, {
			onSuccess: () => {
				onClose();
				setEditingDoctor(null);
			},
		});
	};
	const updateDoctorMutation = useUpdateDoctor();
	const handleSave = () => {
		onClose();
		if (!editingDoctor?.id) return;
		updateDoctorMutation.mutate({
			id: editingDoctor.id,
			name: editingDoctor.name,
			email: editingDoctor.email,
			gender: editingDoctor.gender,
			isActive: editingDoctor.isActive,
			phone: editingDoctor.phone ?? undefined,
			speciality: editingDoctor.speciality ?? undefined,
		});
		setEditingDoctor(null);
	};
	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-125">
				<DialogHeader>
					<DialogTitle>Edit Doctor</DialogTitle>
					<DialogDescription>
						Update doctor information and status.
					</DialogDescription>
				</DialogHeader>

				{editingDoctor && (
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={editingDoctor.name}
									onChange={(e) =>
										setEditingDoctor({ ...editingDoctor, name: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="speciality">Speciality</Label>
								<Input
									id="speciality"
									value={editingDoctor.speciality ?? ""}
									onChange={(e) =>
										setEditingDoctor({
											...editingDoctor,
											speciality: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={editingDoctor.email}
								onChange={(e) =>
									setEditingDoctor({ ...editingDoctor, email: e.target.value })
								}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								value={editingDoctor.phone ?? ""}
								onChange={(e) => handlePhoneChange(e.target.value)}
								placeholder="(+91) 12345-67890"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="gender">Gender</Label>
								<Select
									value={editingDoctor.gender || ""}
									onValueChange={(value) =>
										setEditingDoctor({
											...editingDoctor,
											gender: value as Gender,
										})
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
								<Label htmlFor="status">Status</Label>
								<Select
									value={editingDoctor.isActive ? "active" : "inactive"}
									onValueChange={(value) =>
										setEditingDoctor({
											...editingDoctor,
											isActive: value === "active",
										})
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
				)}
				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={deleteDoctorMutation.isPending}
					>
						{deleteDoctorMutation.isPending ? "Deleting..." : "Delete Doctor"}
					</Button>
					<Button
						onClick={handleSave}
						className="bg-primary hover:bg-primary/90"
						disabled={updateDoctorMutation.isPending}
					>
						{updateDoctorMutation.isPending ? "Saving..." : "Save Changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditDoctorDialog;
