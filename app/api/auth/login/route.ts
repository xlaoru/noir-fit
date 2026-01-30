import { cookies } from "next/headers"
import { signAccessToken, signRefreshToken } from "@/lib/jwt"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/seed"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email or password was not provided." },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: `User with email: ${email} not found.` },
        { status: 404 },
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Password is incorrect." },
        { status: 404 },
      )
    }

    const accessToken = signAccessToken({ id: user.id })
    const refreshToken = signRefreshToken({ id: user.id })

    const cookiesStore = await cookies()

    cookiesStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    })

    cookiesStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json(
      { message: "User logged in successfully." },
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
