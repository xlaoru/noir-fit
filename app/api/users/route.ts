import prisma from "@/lib/seed"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    if (users.length === 0) {
      return NextResponse.json({ message: "Users not found." }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Users were fetched successfully.", users },
      { status: 201 },
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: `Something went wrong: ${e}.` },
      { status: 500 },
    )
  }
}
