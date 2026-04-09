"use server";
/** @format */
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

const userSyncToDB = async () => {
	try {
		const user = await currentUser();
		if (!user) return;
		const existingUser = await prisma.user.findUnique({
			where: {
				clerkId: user.id,
			},
		});
		if (existingUser) return;
		const dbUser = await prisma.user.create({
			data: {
				clerkId: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.emailAddresses[0]?.emailAddress,   // clerk stores emailAddress as array[]
				imageURL: user.imageUrl,
        phone: user.phoneNumbers[0]?.phoneNumber,
			},
		});
    return dbUser;
	} catch (err) {
		console.error("Failed to sync user with DB", err);
	}
};

export default userSyncToDB;
