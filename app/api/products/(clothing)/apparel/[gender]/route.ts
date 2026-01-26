import { Category, Gender } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { Prisma } from "@/app/generated/prisma"
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

        const { searchParams } = new URL(request.url)

        const categoryFilter = searchParams.get("category")
        const sortFilter = searchParams.get("sort") ?? "newest"

        const where: Prisma.ProductWhereInput = {
            type: "APPAREL",
            gender: gender.toUpperCase() as Gender
        }

        if (categoryFilter) {
            where.category = categoryFilter as Category
        }

        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }

        if (sortFilter === "price_asc") {
            orderBy = { price: "asc" }
        }
        
        if (sortFilter === "price_desc") {
            orderBy = { price: "desc" }
        }

        const apparel = await prisma.product.findMany({
            where,
            orderBy,
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

        const rawCategories = await prisma.product.findMany({
            where: {
                type: "APPAREL"
            },
            select: {
                category: true
            },
            distinct: ["category"]
        })

        const categories = rawCategories.map(item => item.category)

        return NextResponse.json({ message: `Apparel for ${gender} were fetched successfully`, apparel, categories }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}