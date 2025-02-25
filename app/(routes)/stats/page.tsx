import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Stats | Cineverse",
	description: "View your watching statistics on Cineverse",
};

export default function StatsPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="max-w-7xl mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight mt-10 text-cv-primary">
					Stats
				</h1>
				<p className="mt-4 text-muted-foreground">
					Track your viewing habits and discover insights about your
					entertainment preferences.
				</p>
			</div>
		</div>
	);
}
