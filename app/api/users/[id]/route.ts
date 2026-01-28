import prisma from "@/lib/seed"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  requst: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { message: "User ID not found." },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        wishlist: true,
        orders: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { messaging: `User with id: ${id} not found.` },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: "User was fetched successfully.", user },
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
