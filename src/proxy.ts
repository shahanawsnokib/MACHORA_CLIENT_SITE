import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Quickly redirect signed-out visitors. Protected pages still verify the session and role.
  if (getSessionCookie(request)) return NextResponse.next();

  const login = new URL("/login", request.url);
  const path = request.nextUrl.pathname;
  const booking = path.startsWith("/browse_equipment/") && request.nextUrl.searchParams.get("book") === "1";
  const paymentId = path.startsWith("/payment/") && request.nextUrl.searchParams.get("booking");
  const query = paymentId && /^[a-f0-9]{24}$/.test(paymentId) ? "?booking=" + paymentId : booking ? "?book=1" : "";
  login.searchParams.set("next", path + query);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/browse_equipment/:id", "/payment/:result"],
};
