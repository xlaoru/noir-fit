import prisma from "@/lib/seed";
import { Prisma, Gender, CollectionCategories } from "@/app/generated/prisma"

export async function GET(
    request: Request,
    { params }: { params: { gender: string } }
) {
    try {
        const { gender } = await params

        if (!["men", "women"].includes(gender.toLowerCase())) {
            return Response.json({ message: "Invalid gender." }, { status: 400 })
        }

        const { searchParams } = new URL(request.url)

        const categoryFilter = searchParams.get("category") 
        const sortFilter = searchParams.get("sort") ?? "newest"

        const where: Prisma.CollectionWhereInput = {
            gender: gender.toLowerCase() === "men" ? Gender.MEN : Gender.WOMEN,
        }

        if (categoryFilter && Object.values(CollectionCategories).includes(categoryFilter as CollectionCategories)) {
            where.category = categoryFilter as CollectionCategories
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

        const rawCollections = await prisma.collection.findMany({
            where,
            orderBy,
            select: {
                id: true,
                images: true,
                title: true,
                price: true,
                category: true,
                gender: true,
                slug: true
            }
        })

        const collections = rawCollections.map((c) => ({
            id: c.id,
            image: c.images[0],
            title: c.title,
            price: c.price,
            category: c.category,
            gender: c.gender,
            slug: c.slug,
            type: "collections"
        }))

        const rawCategories = await prisma.collection.findMany({
            select: {
                category: true
            },
            distinct: ["category"]
        })

        const categories = rawCategories.map(item => item.category)

        return Response.json(
            { message: `Collections for ${gender} were fetched successfully.`, collections, categories }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}