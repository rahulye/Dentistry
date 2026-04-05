/** @format */
import { Button } from "@/components/ui/button";
import {
	SignIn,
	SignInButton,
	SignOutButton,
	SignUpButton,
	useAuth,
} from "@clerk/nextjs";

export default function Home() {
	// const { isSignedIn } = useAuth();
	return (
		<div className="flex justify-between">
			<SignInButton mode="modal">
				<Button className="btn btn-ghost btn-sm">Sign In</Button>
			</SignInButton>
			<SignUpButton mode="modal">
				<Button className="btn btn-primary btn-sm">Get Started</Button>
			</SignUpButton>
		</div>
	);
}
