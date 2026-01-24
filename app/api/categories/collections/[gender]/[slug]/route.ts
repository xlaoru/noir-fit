import prisma from "@/lib/seed"

export async function GET(
    request: Request,
    { params }: { params: { gender: string, slug: string } }
) {
    try {
        const { gender, slug } = await params

        if (!["men", "women"].includes(gender.toLowerCase())) {
            return Response.json({ message: "Invalid gender." }, { status: 400 })
        }

        if (!slug) {
            return Response.json({ message: "There are no slug." }, { status: 400 })
        }

        const cloth = await prisma.collection.findUnique({
            where: {
                slug
            }
        })

        if (!cloth) {
            return Response.json({ message: "No cloth found." }, { status: 404 })
        }

        const rawRecommended = await prisma.collection.findMany({
            where: {
                category: cloth.category,
                id: {
                    not: cloth.id,
                },
            },
            take: 4,
        })

        const recommended = rawRecommended.map((r) => ({
            id: r.id,
            title: r.title,
            price: r.price,
            image: r.images[0] ?? null,
            category: r.category,
            gender: r.gender,
            slug: r.slug,
            type: "collections",
        }))

        return Response.json(
            { message: `Cloth for ${gender} was fetched successfully.`, cloth: {...cloth, type: "collections"}, recommended }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}