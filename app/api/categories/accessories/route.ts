import prisma from "@/lib/seed";

export async function GET() {
    try {
        const rawAccessories = await prisma.accessory.findMany({
            select: {
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
            image: a.images[0],
            title: a.title,
            price: a.price,
            category: a.category,
            slug: a.slug
        }))

        return Response.json(
            {message: "Accessories were fetched successfully.", accessories},
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}