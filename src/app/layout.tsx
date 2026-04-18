/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProviders from "./providers";
import { Toast } from "radix-ui";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dentistry - AI powered Dental Assistant",
	description: "Get 24/7 AI-powered dental advice through voice calls.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<TanStackProviders>
			<ClerkProvider
				appearance={{
					variables: {
						colorPrimary: "#e78a53",
						colorBackground: "#f3f4f6",
						colorText: "#111827",
						colorTextSecondary: "#6b7280",
						colorInputBackground: "#f3f4f6",
					},
				}}
			>
				<html
					lang="en"
					className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
				>
					<body>
						<main>
							<UserSync />
							<Toaster/>
							{children}
						</main>
					</body>
				</html>
			</ClerkProvider>
		</TanStackProviders>
	);
}
