import prisma from "@/lib/seed";

export async function GET() {
    try {
        const [collections, accessories, nutrition] = await Promise.all([
            prisma.collection.findMany({
                select: {
                    id: true,
                    title: true,
                    price: true,
                    images: true,
                    category: true,
                    gender: true,
                    slug: true,
                    createdAt: true,
                },
            }),
            prisma.accessory.findMany({
                select: {
                    id: true,
                    title: true,
                    price: true,
                    images: true,
                    category: true,
                    slug: true,
                    createdAt: true,
                },
            }),
            prisma.nutrition.findMany({
                select: {
                    id: true,
                    title: true,
                    price: true,
                    images: true,
                    category: true,
                    slug: true,
                    createdAt: true,
                },
            }),
        ])

        if (!collections.length || !accessories.length || !nutrition.length) {
            return Response.json({ message: "Something went wrong with data getting" }, { status: 404 })
        }

        const products = [
            ...collections.map(c => ({
                id: c.id,
                title: c.title,
                price: c.price,
                image: c.images[0] ?? null,
                category: c.category,
                gender: c.gender,
                slug: c.slug,
                type: "collections",
                createdAt: c.createdAt,
            })),
            ...accessories.map(a => ({
                id: a.id,
                title: a.title,
                price: a.price,
                image: a.images[0] ?? null,
                category: a.category,
                slug: a.slug,
                type: "accessories",
                createdAt: a.createdAt,
            })),
            ...nutrition.map(n => ({
                id: n.id,
                title: n.title,
                price: n.price,
                image: n.images[0] ?? null,
                category: n.category,
                slug: n.slug,
                type: "nutrition",
                createdAt: n.createdAt,
            })),
        ]
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 8)

        return Response.json({ message: "Products were fetched successfully.", products }, { status: 200 })
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}