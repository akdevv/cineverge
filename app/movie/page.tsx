import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Movies | Cineverse",
	description: "Discover and explore movies on Cineverse",
};

export default function MoviesPage() {
	return (
		<div className="bg-black min-h-screen">
			<Navbar />
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight mt-10 text-white">Movies</h1>
				<p className="mt-4 text-gray-400">
					Discover and explore your favorite movies.
				</p>
			</div>
		</div>
	);
}
