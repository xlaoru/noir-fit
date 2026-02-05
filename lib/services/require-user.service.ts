import { cookies } from "next/headers"
import { SESSION_TTL } from "./session.service"
import redis from "../redis"
import prisma from "../prisma"

export async function requireUser() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    return null
  }

  const key = `session:${sessionId}`

  const userId = await redis.get(key)

  if (!userId) {
    return null
  }

  await redis.expire(key, SESSION_TTL)

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return null
  }

  return user
}
