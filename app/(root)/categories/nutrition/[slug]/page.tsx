import { IFullProduct, IProduct } from "@/utils/models"
import ProductPage from "@/components/pages/ProductPage"
import { formatSlugToTitle } from "@/utils/formatSlugToTitle"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = formatSlugToTitle(slug)

    return {
        title,
        description: `Here you can see more info about ${title}.`
    }
}

export default async function Nutration({ params, }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/nutrition/${slug}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { nutrition, recommended }: { nutrition: IFullProduct, recommended: IProduct[] } = await response.json()

    return (
        <ProductPage
            product={nutrition}
            recommended={recommended}
            type="nutrition"
            backRoute="/categories/nutrition"
        />
    )
}