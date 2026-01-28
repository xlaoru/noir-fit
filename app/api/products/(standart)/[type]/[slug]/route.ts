import { Type } from "@/app/generated/prisma"
import prisma from "@/lib/seed"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { type: Type; slug: string } },
) {
  try {
    const { type, slug } = await params

    if (!slug) {
      return NextResponse.json(
        { message: "Slug was not provided." },
        { status: 400 },
      )
    }

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    })

    if (!product) {
      return NextResponse.json(
        { message: `There are no products with slug: ${slug}.` },
        { status: 404 },
      )
    }

    const recommended = await prisma.product.findMany({
      where: {
        id: {
          not: product.id,
        },
        category: product.category,
      },
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
      take: 4,
    })

    return NextResponse.json(
      {
        message: "Product was fetched successufully.",
        [type.toLowerCase()]: product,
        recommended,
      },
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
