// src/middleware.js
import { NextResponse } from "next/server";

const loggedInRoutes = ["/dashboard", "/source", "/user", "/production"];
const loggedOutRoutes = ["/login"];

export default async function AuthMiddleware(req) {
  const isPublicRoute = loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path));
  const isPrivateRoute = loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

  const token = req.cookies.get("token")?.value || null;

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
