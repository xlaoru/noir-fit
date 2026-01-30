import { cookies } from "next/headers"
import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "../jwt"
import prisma from "../seed"

export async function requireUser() {
  const cookiesStore = await cookies()

  const accessToken = cookiesStore.get("accessToken")?.value
  const refreshToken = cookiesStore.get("refreshToken")?.value

  if (!refreshToken) {
    throw new Error("Not authenticated")
  }

  let payload

  try {
    payload = verifyAccessToken(accessToken!)
  } catch (e) {
    console.log(e)
    payload = verifyRefreshToken(refreshToken)

    const newAccessToken = signAccessToken({ id: payload.id })

    cookiesStore.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
