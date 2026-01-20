import prisma from "@/lib/seed";

export async function GET() {
    try {
        const rawNutrition = await prisma.nutrition.findMany({
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

        return Response.json(
            {message: "Nutrition was fetched successfully.", nutrition},
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}