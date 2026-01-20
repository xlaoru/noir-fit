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

        return Response.json(
            { message: "Accessory was fetched successfully.", accessory }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}