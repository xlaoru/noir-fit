import prisma from "@/lib/seed";
import { Prisma, AccessoryCategories } from "@/app/generated/prisma"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const categoryFilter = searchParams.get("category") 
        const sortFilter = searchParams.get("sort") ?? "newest" 

        const where: Prisma.AccessoryWhereInput = {}

        if (categoryFilter && Object.values(AccessoryCategories).includes(categoryFilter as AccessoryCategories)) {
            where.category = categoryFilter as AccessoryCategories
        }

        let orderBy: { createdAt: "desc"  } | { price: "asc"  | "desc"  } = { 
            createdAt: "desc" 
        }

        if (sortFilter === "price_asc") {
            orderBy = { price: "asc" }
        }

        if (sortFilter === "price_desc") {
            orderBy = { price: "desc" }
        }

        const rawAccessories = await prisma.accessory.findMany({
            where,
            orderBy,
            select: {
                id: true,
                images: true,
                title: true,
                price: true,
                category: true,
                slug: true
            }
        })

        if (!rawAccessories.length) {
            return Response.json({ message: "No accessories found." }, { status: 404 })
        }

        const accessories = rawAccessories.map((a) => ({
            id: a.id,
            image: a.images[0],
            title: a.title,
            price: a.price,
            category: a.category,
            slug: a.slug,
            type: "accessories"
        }))

        const rawCategories = await prisma.accessory.findMany({
            select: {
                category: true
            },
            distinct: ["category"]
        })

        const categories = rawCategories.map(item => item.category)

        return Response.json(
            { message: "Accessories were fetched successfully.", accessories, categories },
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}