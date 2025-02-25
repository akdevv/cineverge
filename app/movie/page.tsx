import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Movies | Cineverse",
	description: "Discover and explore movies on Cineverse",
};

export default function MoviesPage() {
	return (
		<div className="container mx-auto px-4">
			<Navbar />
			<h1 className="text-4xl font-bold tracking-tight mt-10">Movies</h1>
			<p className="mt-4 text-muted-foreground">
				Discover and explore your favorite movies.
			</p>
		</div>
	);
}
