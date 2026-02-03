import { cookies } from "next/headers"
import prisma from "../prisma"
import redis from "../redis"

export async function requireUser() {
  const cookieStore = await cookies()

  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    throw new Error("Session id was not defined.")
  }

  const userId = await redis.get(`session:${sessionId}`)

  console.log(userId)

  if (!userId) {
    throw new Error("Session was expired.")
  }

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
