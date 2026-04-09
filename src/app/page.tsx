/** @format */

import CTA from "@/components/landing/CTA";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";
import Footer from "@/components/landing/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await currentUser();
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<Hero />
			<HowItWorks />
			<WhatToAsk />
			<CTA />
			<PricingSection />
			<Footer />
		</div>
	);
}
