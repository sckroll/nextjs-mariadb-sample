import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isHomeRoute = pathname === "/";
  
  if (!sessionToken && !isAuthRoute && !isHomeRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionToken && (isAuthRoute || isHomeRoute)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};