"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	const navLinks = [
		{ href: "/movie", label: "Movies" },
		{ href: "/tv", label: "TV Shows" },
		{ href: "/stats", label: "Stats" },
	];

	return (
		<nav className="border-b border-gray-800 bg-black">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link
					href="/home"
					className="font-bold text-xl flex items-center text-white"
				>
					Cineverse
				</Link>

				{/* Navigation Links */}
				<div className="hidden md:flex items-center space-x-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`hover:text-blue-400 transition-colors ${
								pathname === link.href
									? "text-blue-500 font-medium"
									: "text-gray-400"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* User settings */}
				<Link
					href="/settings"
					className="p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300"
					aria-label="User settings"
				>
					<User size={20} />
				</Link>
			</div>
		</nav>
	);
}
