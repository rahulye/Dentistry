/** @format */

import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

const Hero = () => {
	return (
		<section className="relative z-10 mx-auto px-6 py-32 text-center overflow-hidden flex justify-center">
			{/* grid */}
			<div className="absolute inset-0 pointer-events-none bg-linear-to-br from-background via-muted/0 to-primary/0">
				<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[2rem_2rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_180%)] opacity-8" />
			</div>
			{/* orbs */}
			<div className="absolute top-20 left-1/4 w-60 h-50 pointer-events-none bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
			<div className="absolute bottom-20 right-1/4 w-96 h-96 pointer-events-none bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />{" "}
			{/* main header */}
			<div className="max-w-7xl w-full z-10 ">
				<h1 className="mx-auto tracking-tight max-w-5xl text-5xl font-bold md:text-7xl drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]">
					<span className="bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
						Your dental
					</span>
					<br></br>
					<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						questions
					</span>
					<br></br>
					answered immediately
				</h1>
				<p className="mx-auto m-8 font-medium text-lg max-w-2xl tracking-tight text-muted-foreground">
					Chat with our AI dental assistant for instant advice, book smart
					appointments, and get personalized care recommendations. Available
					24/7.
				</p>
				{/* CTA */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<SignUpButton mode="modal">
						<Button size="lg">
							<span className="inline-flex items-center gap-2 ">
								<MicIcon className="size-5" />
								Try voice agent
							</span>
						</Button>
					</SignUpButton>
					<SignUpButton mode="modal">
						<Button size="lg" variant="outline">
							<span className="inline-flex items-center gap-2">
								<CalendarIcon className="size-5" />
								Book appointment
							</span>
						</Button>
					</SignUpButton>
				</div>
				{/* User testimonials */}
				<div className="pt-8">
					<div className="flex items-center gap-6">
						<div className="flex -space-x-3">
							<Image
								src="https://plus.unsplash.com/premium_photo-1691030256264-59cdf9414ed1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMGF2YXRhciUyMHBpY3R1cmUlMjBpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D"
								alt="Mahesh"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
							/>
							<Image
								src="https://images.unsplash.com/photo-1725033489648-a819750348eb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMGF2YXRhciUyMHBpY3R1cmUlMjBpbmRpYW4lMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D"
								alt="Vandana"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
							/>
							<Image
								src="https://images.unsplash.com/photo-1739429945557-22682b674508?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBhdmF0YXIlMjBwaWN0dXJlJTIwaW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww"
								alt="Palini"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
							/>
							<Image
								src="https://images.unsplash.com/photo-1591355729471-1f68783641d1?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHByb2ZpbGUlMjBhdmF0YXIlMjBwaWN0dXJlJTIwaW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww"
								alt="Krishna"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
							/>
							<Image
								src="https://images.unsplash.com/photo-1746193689434-fe6f2644d4bb?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHByb2ZpbGUlMjBhdmF0YXIlMjBwaWN0dXJlJTIwaW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww"
								alt="Suresh"
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
							/>
						</div>
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1">
									{[1, 2, 3, 4, 5].map((star) => (
										<StarIcon
											key={star}
											className="h-4 w-4 fill-amber-400 text-amber-400"
										/>
									))}
								</div>
								<span className="text-sm font-bold text-foreground">4.7/5</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Trusted by{" "}
								<span className="font-semibold text-foreground">
									800+ patients
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
