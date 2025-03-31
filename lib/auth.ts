import prisma from "./prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { headers } from "next/headers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

declare module "next-auth" {
	interface User {
		lastLoginAt?: Date;
		lastLoginIp?: string;
		lastLoginUserAgent?: string;
		isActive?: boolean;
	}

	interface Session {
		user: {
			id: string;
			lastLoginAt?: Date;
			lastLoginIp?: string;
			lastLoginUserAgent?: string;
			isActive?: boolean;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		lastLoginAt?: Date;
		lastLoginIp?: string;
		lastLoginUserAgent?: string;
		isActive?: boolean;
		sessionToken?: string;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials ?? {};
				if (!email || !password) return null;

				const user = await prisma.user.findUnique({
					where: { email: email as string },
				});

				if (!user || !user.password) return null;

				const passwordsMatch = await bcrypt.compare(
					password as string,
					user.password
				);
				if (!passwordsMatch) return null;

				// Login Metadata
				const userAgent =
					(await headers()).get("user-agent") ?? "unknown";
				const ip =
					(await headers()).get("x-forwarded-for") ??
					(await headers()).get("x-real-ip") ??
					"unknown";

				// Update user login metadata
				await prisma.user.update({
					where: { id: user.id },
					data: {
						lastLoginAt: new Date(),
						lastLoginIp: ip,
						lastLoginUserAgent: userAgent,
						isActive: true,
					},
				});

				// Store session info in database
				await prisma.session.create({
					data: {
						sessionToken: crypto.randomUUID(),
						userId: user.id,
						expires: new Date(
							Date.now() + 15 * 24 * 60 * 60 * 1000
						), // 15 days
						userAgent,
						ipAddress: ip,
					},
				});

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					lastLoginAt: new Date(),
					lastLoginIp: ip,
					lastLoginUserAgent: userAgent,
					isActive: true,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 15, // 15 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.lastLoginAt = user.lastLoginAt;
				token.lastLoginIp = user.lastLoginIp;
				token.lastLoginUserAgent = user.lastLoginUserAgent;
				token.isActive = user.isActive;
			}

			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.lastLoginAt = token.lastLoginAt as Date;
				session.user.lastLoginIp = token.lastLoginIp as string;
				session.user.lastLoginUserAgent =
					token.lastLoginUserAgent as string;
				session.user.isActive = token.isActive as boolean;
			}
			return session;
		},
	},
	cookies: {
		sessionToken: {
			name:
				process.env.NODE_ENV === "production"
					? "__Secure-next-auth.session-token"
					: "next-auth.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 15, // 15 days
			},
		},
	},
	events: {
		async signOut(message) {
			if ("token" in message && message.token?.sessionToken) {
				await prisma.session.deleteMany({
					where: { sessionToken: message.token.sessionToken },
				});
			}
		},
	},
});