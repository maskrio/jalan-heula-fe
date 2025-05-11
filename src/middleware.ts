import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const authToken = request.cookies.get("auth_token")?.value;
	const { pathname } = request.nextUrl;

	// Define protected routes that require authentication
	const protectedRoutes = ["/profile"];

	// Define authentication routes (login/register)
	const authRoutes = ["/login", "/register"];

	// Check if the current path is a protected route
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	// Check if the current path is an auth route
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	// If trying to access protected route without being logged in
	if (isProtectedRoute && !authToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// If trying to access login/register while already logged in
	if (isAuthRoute && authToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Match all routes except for static files, api routes, and _next
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
