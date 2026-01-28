import prisma from "@/lib/seed"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        images: true,
        title: true,
        price: true,
        category: true,
        gender: true,
        slug: true,
        type: true,
      },
      take: 8,
    })

    if (!products) {
      return NextResponse.json(
        { message: "Something went wrong with data fetching." },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: "Products were fetched successfully.", products },
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
