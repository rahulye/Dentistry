/** @format */

import { SignUpButton } from "@clerk/nextjs";
import {
	ArrowRightIcon,
	BrainIcon,
	LucideCalendarRange,
	MicIcon,
  ZapIcon,
} from "lucide-react";
import { Button } from "../ui/button";

const HowItWorks = () => {
	return (
		<section className="max-w-7xl mx-auto py-10 px-8 z-10 bg-linear-to-b from-background to-muted/5" id="how-it-works">
			{/* main header */}
			<div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
          <ZapIcon className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">Process</span>
        </div>
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
					<span className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
						Three steps to
					</span>
					<br />
					<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						better dental health
					</span>
				</h2>
				<p className="text-xl text-muted-foreground max-w-3xl mx-auto tracking-tight">
					Our process makes dental care accessible, convenient, and stress-free
					for everyone
				</p>
			</div>
			{/* steps card */}
			<div className="relative">
				<div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
				<div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
					{/* 1 */}
					<div className=" relative group">
						<div className="relative max-h-100 bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/90">
							<div className="absolute -top-4 left-8 size-8 bg-linear-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
								1
							</div>
							<div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
								<div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-70 group-hover:opacity-100 transition" />
								<div className="relative w-full h-full rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
									<MicIcon className="h-10 w-10 text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								Ask Questions
							</h3>
							<p className="text-muted-foreground text-center leading-relaxed mb-6">
								Chat with our AI assistant about any dental concerns. Get
								instant answers about symptoms, treatments, and oral health
								tips.
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									24/7 Available
								</span>
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									Instant Response
								</span>
							</div>
						</div>
					</div>
					{/* 2 */}
					<div className=" relative group">
						<div className="relative max-h-100 h-full bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/90">
							<div className="absolute -top-4 left-8 size-8 bg-linear-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
								2
							</div>
							<div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
								<div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-70 group-hover:opacity-100 transition" />
								<div className="relative w-full h-full rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
									<BrainIcon className="h-10 w-10 text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								Get Expert Advice
							</h3>
							<p className="text-muted-foreground text-center leading-relaxed mb-6">
								Receive personalized recommendations based on thousands of
								dental cases.Our AI provides professional-grade insights.
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									AI-Powered
								</span>
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									Personalized
								</span>
							</div>
						</div>
					</div>
					{/* 3 */}
					<div className=" relative group">
						<div className="relative max-h-100 h-full bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/90">
							<div className="absolute -top-4 left-8 size-8 bg-linear-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
								3
							</div>
							<div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
								<div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-70 group-hover:opacity-100 transition" />
								<div className="relative w-full h-full rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
									<LucideCalendarRange className="h-10 w-10 text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-center">
								Book & Get Care
							</h3>
							<p className="text-muted-foreground text-center leading-relaxed mb-6">
								Schedule with verified dentists and receive comprehensive
								follow-up care. Track your progress seamlessly. tips.
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									Verified Doctors
								</span>
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
									Follow-up Care
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
      {/* CTA */}
			<div className="text-center mt-16">
				<SignUpButton mode="modal">
					<Button size="lg">
						<ArrowRightIcon className="mr-2 size-5" />
						Get started now
					</Button>
				</SignUpButton>
			</div>
		</section>
	);
};

export default HowItWorks;
