import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*", "/cart/:path*", "/wishlist/:path*"],
}
