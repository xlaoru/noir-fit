import prisma from "@/lib/seed";
import { Prisma, NutritionCategories } from "@/app/generated/prisma"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const categoryFilter = searchParams.get("category") 
        const sortFilter = searchParams.get("sort") ?? "newest" 

        const where: Prisma.NutritionWhereInput = {}

        if (categoryFilter && Object.values(NutritionCategories).includes(categoryFilter as NutritionCategories)) {
            where.category = categoryFilter as NutritionCategories
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

        const rawNutrition = await prisma.nutrition.findMany({
            where,
            orderBy,
            select: {
                images: true,
                title: true,
                price: true,
                category: true,
                slug: true
            }
        })

        if (!rawNutrition.length) {
            return Response.json({ message: "No nutrition found." }, { status: 404 })
        }

        const nutrition = rawNutrition.map((n) => ({
            image: n.images[0],
            title: n.title,
            price: n.price,
            category: n.category,
            slug: n.slug
        }))

        const rawCategories = await prisma.nutrition.findMany({
            select: {
                category: true
            },
            distinct: ["category"]
        })

        const categories = rawCategories.map(item => item.category)

        return Response.json(
            { message: "Nutrition was fetched successfully.", nutrition, categories },
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}