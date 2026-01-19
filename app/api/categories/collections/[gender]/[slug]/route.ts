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

        const product = await prisma.collection.findUnique({
            where: {
                slug
            }
        })

        if (!product) {
            return Response.json({ message: "No product found." }, { status: 404 })
        }

        return Response.json(
            { message: `Product for ${gender} was fetched successfully.`, product }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}