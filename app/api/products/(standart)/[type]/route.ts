import { Category, Type } from "@/app/generated/prisma";
import prisma from "@/lib/seed";
import { NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma"

export async function GET(
    request: Request,
    { params }: { params: { type: string } }
) {
    try {
        const { type } = await params
        
        if (!type) {
            return NextResponse.json({ message: "Type was not provided." }, { status: 400 })
        }

        const { searchParams } = new URL(request.url)
        
        const categoryFilter = searchParams.get("category")
        const sortFilter = searchParams.get("sort") ?? "newest"

        const where: Prisma.ProductWhereInput = {
            type: type.toUpperCase() as Type,
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

        const products = await prisma.product.findMany({
            where,
            orderBy,
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

        const rawCategories = await prisma.product.findMany({
            where: {
                type: type.toUpperCase() as Type 
            },
            select: {
                category: true
            },
            distinct: ["category"]
        })

        const categories = rawCategories.map(item => item.category)

        return NextResponse.json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} were fetched successfully.`, [type.toLowerCase()]: products, categories }, { status: 201 })
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: `Something went wrong: ${e}.` }, { status: 500 })
    }
}