/** @format */

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { MicIcon, CalendarIcon } from "lucide-react";
const CTA = () => {
	return (
		<section className="relative py-20 px-6 overflow-hidden">
			<div className="relative z-10 max-w-6xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-4">
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10">
							<div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
							<span className="text-xs font-medium text-primary">
								Ready When You Are
							</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold leading-tight">
							<span className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
								Your dental health
							</span>
							<br />
							<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
								journey starts here
							</span>
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">
							Join 800+ patients who trust our AI for instant guidance and
							personalized care.
						</p>
					</div>
					{/* CTA Buttons */}
					<div>
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<SignUpButton mode="modal">
								<Button
									size="lg"
									className="px-6 py-3 font-semibold bg-linear-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
								>
									<span className="flex items-center gap-2">
										<MicIcon className="mr-2 h-4 w-4" />
										Start free chat
									</span>
								</Button>
							</SignUpButton>
							<SignUpButton mode="modal">
								<Button
									size="lg"
									variant="outline"
									className="px-6 py-3 font-semibold border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl"
								>
									<span className="flex items-center gap-2">
										<CalendarIcon className="mr-2 h-4 w-4" />
										Book appointment
									</span>
								</Button>
							</SignUpButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default CTA;
