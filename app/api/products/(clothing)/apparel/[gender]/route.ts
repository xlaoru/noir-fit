import { Gender } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { gender: string } }
) {
    try {
        const { gender } = await params

        if (!gender) {
            return NextResponse.json({ message: "Gender was not provided." }, { status: 400 })
        }

        const apparel = await prisma.product.findMany({
            where: {
                type: "APPAREL",
                gender: gender.toUpperCase() as Gender
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
            }
        })

        if (!apparel) {
            return NextResponse.json({ message: `Something went wrong with apparel's of ${gender} data fetching.` }, { status: 404 })
        }

        return NextResponse.json({ message: `Apparel for ${gender} were fetched successfully`, apparel }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}