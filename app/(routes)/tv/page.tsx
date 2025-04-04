import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "TV Shows | Cineverse",
	description: "Browse and watch TV shows on Cineverse",
};

export default function TVShowsPage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="max-w-7xl mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight mt-10 text-cv-primary">
					TV Shows
				</h1>
				<p className="mt-4 text-muted-foreground">
					Explore the latest and greatest television series.
				</p>
			</div>
		</div>
	);
}
