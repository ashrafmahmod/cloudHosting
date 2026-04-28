// proxy is the new old named middleware it works on files u dont need to import like not-found and loading.ts files
import { NextRequest, NextResponse } from "next/server";
// import { verifyTokenforpage } from "./utils/verifyToken";
export function proxy(request: NextRequest) {
  // const authToken = request.headers.get("authorization") as string;we use cookie
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  // const payload = verifyTokenforpage(token); i commented it coz we cant use verifyToken coz it handle jwt
  console.log(request.nextUrl.pathname); // this will get url
  const path = request.nextUrl.pathname;
  // const { pathname } = request.nextUrl; u can use object destructure
  if (path.startsWith("/api/users/profile")) {
    if (!token)
      return NextResponse.json(
        { message: "Access denied. No token provided." },
        { status: 401 },
      );
  }
  if (path.startsWith("/login") || path.startsWith("/register")) {
    if (token)
      // If they HAVE a token, send them to dashboard instead of login page
      return NextResponse.redirect(new URL("/", request.url));
  }
  // if (path.startsWith("/admin")) {
  //   if (!payload?.isAdmin)
  //     return NextResponse.redirect(new URL("/", request.url));
  // }
  // CRITICAL: You must return next() so the request can actually finish if no proxy u need
  // it to close gate to tell next am done checks instead of stuck in proxy
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/profile/:path*",
    "/login",
    "/register",
    // "/admin/:path*", // : tels nest its variable can name anything and path (No asterisk): Matches exactly one segment. like /admin/abc but not /admin/abc/123, :path* (With asterisk): Matches zero or more segments.like /admin/article-table or /admin/abc/123
  ], // next ignores app and src folders name
};
