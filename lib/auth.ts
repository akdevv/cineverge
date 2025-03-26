import prisma from "./prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

// import { getUserAgent } from "./lib/user-agent";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				try {
					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (!user) {
						console.log("User not found");
						return null;
					}

					// Check password
					const passwordValid = bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!passwordValid) {
						console.log("Invalid password");
						return null;
					}

					// Update login metadata
					await prisma.user.update({
						where: { id: user.id },
						data: {
							lastLoginAt: new Date(),
							lastLoginIp:
								req?.headers
									?.get("x-forwarded-for")
									?.toString() || null,
							lastLoginUserAgent: req?.headers?.get("user-agent"),
							isActive: true,
						},
					});

					return {
						id: user.id,
						name: user.name,
						email: user.email,
					};
				} catch (error) {
					console.error("Authorization error:", error);
					return null;
				}
			},
		}),
	],
	session: { strategy: "jwt" },
});
