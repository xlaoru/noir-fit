import prisma from "@/lib/seed"

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = await params

        if (!slug) {
            return Response.json({ message: "There are no slug." }, { status: 400 })
        }

        const nutrition = await prisma.nutrition.findUnique({
            where: {
                slug
            }
        })

        if (!nutrition) {
            return Response.json({ message: "No nutrition found." }, { status: 404 })
        }

        const rawRecommended = await prisma.nutrition.findMany({
            where: {
                category: nutrition.category,
                id: {
                    not: nutrition.id
                }
            },
            take: 4
        })

        const recommended = rawRecommended.map((r) => ({
            id: r.id,
            title: r.title,
            price: r.price,
            image: r.images[0] ?? null,
            category: r.category,
            slug: r.slug,
            type: "nutrition",
        }))

        return Response.json(
            { message: "Nutrition was fetched successfully.", nutrition: {...nutrition, type: "nutrition"}, recommended }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}