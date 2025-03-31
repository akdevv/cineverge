"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/shared/navbar";

export default function HomePage() {
	const { data: session } = useSession();
	console.log(session);

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
