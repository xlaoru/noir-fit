import { Gender } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { gender: string, slug: string } }
) {
    try {
        const { gender, slug } = await params

        if (!gender) {
            return NextResponse.json({ message: "Gender was not provided." }, { status: 400 })
        }

        if (!slug) {
            return NextResponse.json({ message: "Slug was not provided." }, { status: 400 })
        }

        const apparel = await prisma.product.findUnique({
            where: {
                slug
            }
        })

        if (!apparel) {
            return NextResponse.json({ message: `There are no products with slug: ${slug} for ${gender}.` }, { status: 404 })
        }

        const recommended = await prisma.product.findMany({
            where: {
                id: {
                    not: apparel.id
                },
                category: apparel.category
            },
            select: {
                id: true,
                images: true,
                title: true,
                price: true,
                category: true,
                gender: true,
                slug: true,
                type: true
            },
            take: 4
        })

        return NextResponse.json({ message: `Apparel for ${gender} was fetched successfully`, apparel, recommended }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}