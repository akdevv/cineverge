import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/movie", "settings", "/stats", "/tv"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isApiRoute = pathname.startsWith("/api");
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	const token = await getToken({
		req: request,
		secret: process.env.AUTH_SECRET,
	});

	if (isProtectedRoute && !token) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));
		return NextResponse.redirect(loginUrl);
	}

	if (isApiRoute && token) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/",
		"/home",
		"/movie/:path*",
		"/tv/:path*",
		"/settings",
		"/stats",
		"/api/:path*",
		"/login",
		"/register",
	],
};
