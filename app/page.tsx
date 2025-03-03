import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootPage() {
	return (
		<div className="min-h-screen bg-cv-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="max-w-5xl w-full text-center relative z-10">
				<h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
					Welcome to Cineverse
				</h1>

				<p className="text-xl text-gray-400 max-w-3xl mx-auto">
					Your ultimate destination for discovering and tracking your
					favorite movies and TV shows.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
					<Button
						size="lg"
						className="bg-cv-accent hover:bg-cv-accent/80 text-cv-primary transition-colors duration-300"
					>
						<Link href="/login">Login</Link>
					</Button>
					<Button size="lg" variant="outline">
						<Link href="/register">Register</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
