import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  const publicPaths = ["/auth/login", "/auth/register"]
  const isApiAuth = pathname.startsWith("/api/auth")

  if (isApiAuth || pathname === "/" || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next()
  }

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/account", request.url))
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    try {
      const response = await fetch(new URL("/api/auth/me", request.url), {
        headers: { Cookie: `token=${token}` },
      })
      if (!response.ok) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
      const data = await response.json()
      if (data.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  if (pathname.startsWith("/account") || pathname === "/checkout") {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"],
}
