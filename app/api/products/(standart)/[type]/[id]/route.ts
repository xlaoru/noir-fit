import prisma from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id : string } }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ message: "Id was not provided." }, { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if (!product) {
            return NextResponse.json({ message: `There are no products with id: ${id}.` }, { status: 404 })
        }

        return NextResponse.json({ message: "Product was fetched successufully.", product }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}