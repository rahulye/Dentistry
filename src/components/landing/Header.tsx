/** @format */
import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
	return (
		<nav className="inset-x-0 max-w-6xl mx-auto px-6 py-2 flex items-center top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
			<div className="flex justify-between grow">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src={"/logo.png"}
						alt="dentistry-logo"
						height={32}
						width={32}
					></Image>
					<span>Dentistry</span>
				</Link>
				<div className="hidden md:flex text-sm items-center gap-6">
					<Link
						href="#how-it-works"
						className="text-muted-foreground hover:text-foreground"
					>
						How it works
					</Link>
					<Link
						href="#pricing"
						className="text-muted-foreground hover:text-foreground"
					>
						Pricing
					</Link>
					<Link
						href="#FAQ"
						className="text-muted-foreground hover:text-foreground"
					>
						FAQ
					</Link>
				</div>
				<div className="space-x-4">
					<SignInButton mode="modal">
						<Button size={"sm"} variant={"ghost"}>
							Login
						</Button>
					</SignInButton>
					<SignUpButton mode="modal">
						<Button size={"sm"}>Sign Up</Button>
					</SignUpButton>
				</div>
			</div>
		</nav>
	);
};

export default Header;
