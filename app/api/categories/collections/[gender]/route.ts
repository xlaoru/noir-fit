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

        const products = await prisma.product.findMany({
            where: {
                gender: gender.toUpperCase() as "MEN" | "WOMEN",
            }
        })

        if (!products.length) {
            return Response.json({ message: "No products found." }, { status: 404 })
        }

        return Response.json(
            { message: `Products for ${gender} were fetched successfully.`, products }, 
            { status: 200 }
        )
    } catch (e) {
        console.log(e)
        return Response.json({ message: `Something went wrong with data fetching: ${e}` }, { status: 500 })
    }
}