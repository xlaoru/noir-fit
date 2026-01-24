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

        const accessory = await prisma.accessory.findUnique({
            where: {
                slug
            }
        })

        if (!accessory) {
            return Response.json({ message: "No accessory found." }, { status: 404 })
        }

        const rawRecommended = await prisma.accessory.findMany({
            where: {
                category: accessory.category,
                id: {
                    not: accessory.id
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
            type: "accessories",
        }))

        return Response.json(
            { message: "Accessory was fetched successfully.", accessory: {...accessory, type: "accessories"}, recommended }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}