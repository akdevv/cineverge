import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
	title: "Settings | Cineverse",
	description: "Manage your Cineverse account settings",
};

export default function SettingsPage() {
	return (
		<div className="container mx-auto px-4">
			<Navbar />
			<h1 className="text-4xl font-bold tracking-tight mt-10">
				Settings
			</h1>
			<p className="mt-4 text-muted-foreground">
				Customize your Cineverse experience and manage your account
				preferences.
			</p>
		</div>
	);
}
