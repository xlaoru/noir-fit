import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import redis from "../redis"

export const SESSION_TTL = 10 * 30

export async function createSession(userId: string) {
  const sessionId = randomUUID()

  await redis.set(`session:${sessionId}`, userId, "EX", SESSION_TTL)

  const cookieStore = await cookies()

  cookieStore.set({
    name: "session",
    value: sessionId,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (sessionId) {
    await redis.del(`session:${sessionId}`)
  }

  cookieStore.delete("session")
}
