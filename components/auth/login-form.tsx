"use client";

import Link from "next/link";
import Image from "next/image";
import type React from "react";
import { FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { login } from "@/server/actions";
import { useActionState } from "react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [state, formAction] = useActionState(login, null);

	return (
		<Card className="w-full overflow-hidden bg-cv-background text-cv-primary">
			<CardContent className="grid p-0 md:grid-cols-2">
				<form
					action={formAction}
					className="flex flex-col gap-6 p-6 md:p-8"
				>
					<div className="flex flex-col items-start">
						<h1 className="text-3xl font-bold">Welcome back</h1>
						<p className="text-balance text-cv-primary-dark">
							Login to your account
						</p>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
							className="bg-cv-background text-cv-primary"
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<a
								href="#"
								className="text-sm text-cv-accent-light hover:underline"
							>
								Forgot password?
							</a>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							required
							className="bg-cv-background text-cv-primary"
						/>
					</div>
					{state?.error && (
						<p className="text-red-500">{state.error}</p>
					)}
					<Button
						type="submit"
						className="w-full bg-cv-accent text-cv-primary hover:bg-cv-accent/90"
					>
						Login
					</Button>
					<div className="relative text-center text-sm">
						<span className="bg-cv-background px-2 text-cv-primary-dark relative z-10">
							Or continue with
						</span>
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-cv-primary-dark/20"></span>
						</div>
					</div>
					<Button
						variant="outline"
						className="w-full border-cv-primary-dark/20 hover:bg-cv-accent/10 bg-cv-background"
					>
						<FaGoogle />
						Continue with Google
					</Button>
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href="/register"
							className="text-cv-accent-light hover:underline"
						>
							Sign up
						</Link>
					</div>
				</form>
				<div className="relative hidden md:block">
					<Image
						src="/images/placeholder-auth.png"
						alt="Login"
						className="absolute inset-0 h-full w-full object-cover"
						width={500}
						height={500}
						priority
					/>
				</div>
			</CardContent>
		</Card>
	);
}
