import { INutrition, IShortedNutrition } from "@/utils/models"
import ProductPage from "@/components/ProductPage"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Nutration({ params, }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/nutrition/${slug}`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { nutrition, recommended }: { nutrition: INutrition, recommended: IShortedNutrition[] } = await response.json()

    return (
        <ProductPage
            product={nutrition}
            recommended={recommended}
            type="nutrition"
            backRoute="/categories/nutrition"
        />
    )
}