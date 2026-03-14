import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("session")

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!login|signup|_next/static|_next/image|favicon.ico).*)"],
}
