import { NextRequest, NextResponse } from "next/server"
import redis from "./lib/redis"
import { SESSION_TTL } from "./lib/services/session.service"

export async function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("session")?.value

  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const key = `session:${sessionId}`

  const userId = await redis.get(key)

  if (!userId) {
    const response = NextResponse.redirect(new URL("/login", request.url))

    response.cookies.delete("session")

    return response
  }

  await redis.expire(key, SESSION_TTL)
}

export const config = {
  matcher: ["/cart", "/wishlist", "/account"],
}
