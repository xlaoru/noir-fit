import { cookies } from "next/headers"
import { signAccessToken, verifyRefreshToken } from "@/lib/jwt"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookiesStore = await cookies()

    const refreshToken = cookiesStore.get("refreshToken")?.value

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token was not provided." },
        { status: 401 },
      )
    }

    try {
      const payload = verifyRefreshToken(refreshToken)

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

      return NextResponse.json(
        { message: "Access token refreshed successfully." },
        { status: 200 },
      )
    } catch (e) {
      console.log(e)
      return NextResponse.json(
        { message: "Refresh token was expired." },
        { status: 401 },
      )
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: `Something went wrong: ${e}.` },
      { status: 500 },
    )
  }
}
