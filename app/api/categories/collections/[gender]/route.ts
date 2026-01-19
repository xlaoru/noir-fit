import prisma from "@/lib/seed";

export async function GET(
    request: Request,
    { params }: { params: { gender: string } }
) {
    try {
        const { gender } = await params

        if (!["men", "women"].includes(gender.toLowerCase())) {
            return Response.json({ message: "Invalid gender." }, { status: 400 })
        }

        const rawCollection = await prisma.collection.findMany({
            where: {
                gender: gender.toUpperCase() as "MEN" | "WOMEN",
            },
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

        if (!rawCollection.length) {
            return Response.json({ message: "No collections found." }, { status: 404 })
        }

        const collections = rawCollection.map((product) => ({
            id: product.id,
            image: product.images[0],
            title: product.title,
            price: product.price,
            category: product.category,
            gender: product.gender,
            slug: product.slug
        }))

        return Response.json(
            { message: `Collections for ${gender} were fetched successfully.`, collections }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}