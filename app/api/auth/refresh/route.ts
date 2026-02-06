import redis from "@/lib/redis"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (sessionId) {
    await redis.del(`session:${sessionId}`)
  }

  cookieStore.delete("session")

  const loginUrl = new URL("/login", request.url)

  return NextResponse.redirect(loginUrl)
}
