"use client";
import userSyncToDB from "@/lib/actions/users";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// this is component file that we use to run in layout.tsx (means whenever layout reloads and user not synced it wont go to dashboard path)
function UserSync() {
	const { isSignedIn, isLoaded } = useUser();

	useEffect(() => {
		const handleUserSync = async () => {
			if (isLoaded && isSignedIn) {
				try {
					await userSyncToDB();
				} catch (error) {
					console.error("Failed to sync user",error);
				}
			}
		};
		handleUserSync();
	}, [isLoaded, isSignedIn]);
	return null;
}
export default UserSync;
