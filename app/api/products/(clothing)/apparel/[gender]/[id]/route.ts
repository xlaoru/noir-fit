import { Gender } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { gender: string, id: string } }
) {
    try {
        const { gender, id } = await params

        if (!gender) {
            return NextResponse.json({ message: "Gender was not provided." }, { status: 400 })
        }

        if (!id) {
            return NextResponse.json({ message: "Id was not provided." }, { status: 400 })
        }

        const apparel = await prisma.product.findUnique({
            where: {
                type: "APPAREL",
                gender: gender.toUpperCase() as Gender,
                id
            }
        })

        if (!apparel) {
            return NextResponse.json({ message: `There are no products with id: ${id} for ${gender}.` }, { status: 404 })
        }

        return NextResponse.json({ message: `Apparel for ${gender} was fetched successfully`, apparel }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}