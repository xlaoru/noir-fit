import { Type } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { type: string } }
) {
    try {
        const { type } = await params
        
        if (!type) {
            return NextResponse.json({ message: "Type was not provided." }, { status: 400 })
        }

        const products = await prisma.product.findMany({
            where: {
                type: type.toUpperCase() as Type 
            },
            select: {
                id: true,
                images: true,
                title: true,
                price: true,
                category: true,
                slug: true,
                type: true
            }
        })

        if (!products) {
            return NextResponse.json({ message: `Something went wrong with ${type}'s data fetching.` }, { status: 404 })
        }

        return NextResponse.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} were fetched successfully.`, products }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}