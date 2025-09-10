import { getSessionCookie } from "better-auth/cookies";
import { NextRequest } from "next/server";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  FORBIDDEN_ROUTES,
  PUBLIC_ROUTES,
} from "./constants/routes";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const sessionCookie = getSessionCookie(request);

  // const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isForbiddenRoute = FORBIDDEN_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isForbiddenRoute) return Response.redirect(new URL("/", request.url));

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return;
  }

  if (isLoggedIn === false && !isPublicRoute) {
    return Response.redirect(new URL("/login", request.url));
  }

  return;

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  // if (!sessionCookie) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
