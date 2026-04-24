import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MainActions from "@/components/dashboard/MainActions";
import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import userSyncToDB from "@/lib/actions/users";

const DashboardPage = async () => {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="max-w-7xl mx-auto px-6 py-8 pt-24">
				<WelcomeSection />
				<MainActions />
				<ActivityOverview />
			</div>
		</div>
	);
};
export default DashboardPage;
