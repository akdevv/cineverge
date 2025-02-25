import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Home | Cineverse",
	description: "Welcome to Cineverse - your entertainment hub",
};

export default function HomePage() {
	return (
		<div className="container mx-auto px-4">
			<Navbar />
			<h1 className="text-4xl font-bold tracking-tight mt-10">Home</h1>
			<p className="mt-4 text-muted-foreground">
				Welcome to Cineverse, your personal entertainment center.
			</p>
		</div>
	);
}
