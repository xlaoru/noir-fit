import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookiesStore = await cookies()

    cookiesStore.delete("accessToken")
    cookiesStore.delete("refreshToken")

    return NextResponse.json(
      { message: "User logged out successfully." },
      { status: 200 },
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: `Something went wrong: ${e}.` },
      { status: 500 },
    )
  }
}
