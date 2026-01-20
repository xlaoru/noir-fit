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
                images: true,
                title: true,
                price: true,
                category: true,
                gender: true,
                slug: true
            }
        })

        const collections = rawCollections.map((product) => ({
            image: product.images[0],
            title: product.title,
            price: product.price,
            category: product.category,
            gender: product.gender,
            slug: product.slug
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