import prisma from "@/lib/seed";

export async function GET() {
    try {
        const [collections, accessories, nutrition] = await Promise.all([
            prisma.collection.findMany({
                select: {
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
                    title: true,
                    price: true,
                    images: true,
                    category: true,
                    slug: true,
                    createdAt: true,
                },
            }),
        ])

        if (!collections || !accessories || !nutrition) {
            return Response.json({ message: "Something went wrong with data getting" }, { status: 404 })
        }

        const products = [
            ...collections.map(p => ({
                title: p.title,
                price: p.price,
                image: p.images[0] ?? null,
                category: p.category,
                gender: p.gender,
                slug: p.slug,
                type: "COLLECTIONS",
                createdAt: p.createdAt,
            })),
            ...accessories.map(p => ({
                title: p.title,
                price: p.price,
                image: p.images[0] ?? null,
                category: p.category,
                slug: p.slug,
                type: "ACCESSORIES",
                createdAt: p.createdAt,
            })),
            ...nutrition.map(p => ({
                title: p.title,
                price: p.price,
                image: p.images[0] ?? null,
                category: p.category,
                slug: p.slug,
                type: "NUTRITION",
                createdAt: p.createdAt,
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