import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Home | Cineverse",
	description: "Welcome to Cineverse - your entertainment hub",
};

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="max-w-7xl mx-auto px-4">
				<h1 className="text-4xl font-bold tracking-tight mt-10 text-cv-primary">
					Home
				</h1>
				<p className="mt-4 text-gray-400">
					Welcome to Cineverse, your personal entertainment center.
				</p>
			</div>
		</div>
	);
}
