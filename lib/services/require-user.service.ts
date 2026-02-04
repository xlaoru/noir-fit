import { cookies } from "next/headers"
import prisma from "../prisma"
import redis from "../redis"
import { SESSION_TTL } from "./session.service"

export async function requireUser() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    throw new Error("Session id was not defined.")
  }

  const key = `session:${sessionId}`

  const userId = await redis.get(key)

  if (!userId) {
    throw new Error("Session was expired.")
  }

  await redis.expire(key, SESSION_TTL)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new Error("User was not defined.")
  }

  return user
}
