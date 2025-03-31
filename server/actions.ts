"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const registerSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export async function register(prevState: any, formData: FormData) {
	try {
		const validatedFields = registerSchema.safeParse({
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
		});

		if (!validatedFields.success) {
			return { error: "Invalid fields" };
		}

		const { name, email, password } = validatedFields.data;

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			return { error: "User already exists" };
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Get metadata
		const ip =
			(await headers()).get("x-forwarded-for") ??
			(await headers()).get("x-real-ip");
		const userAgent = (await headers()).get("user-agent") ?? "unknown";

		// Create user
		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				lastLoginAt: new Date(),
				lastLoginIp: ip,
				lastLoginUserAgent: userAgent,
				isActive: true,
			},
		});
	} catch (error) {
		console.error("Registration error:", error);
		return { error: "Registration failed. Please try again." };
	}
}

export async function login(prevState: any, formData: FormData) {
	try {
		const validatedFields = loginSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password"),
		});

		if (!validatedFields.success) {
			return { error: "Invalid fields" };
		}

		const { email, password } = validatedFields.data;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !user.password) {
			return { error: "Invalid credentials" };
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			return { error: "Invalid email or password" };
		}

		// Update login metadata
		const ip =
			(await headers()).get("x-forwarded-for") ??
			(await headers()).get("x-real-ip");
		const userAgent = (await headers()).get("user-agent") ?? "unknown";

		await prisma.user.update({
			where: { email },
			data: {
				lastLoginAt: new Date(),
				lastLoginIp: ip,
				lastLoginUserAgent: userAgent,
			},
		});

		redirect("/home");
	} catch (error) {
		console.error("Login error:", error);
		return { error: "Login failed. Please try again." };
	}
}
