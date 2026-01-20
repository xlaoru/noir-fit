import { IAccessory, IShortedAccessory } from "@/utils/models"
import ProductPage from "@/components/ProductPage"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Accessory({ params, }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/accessories/${slug}`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { accessory, recommended }: { accessory: IAccessory, recommended: IShortedAccessory[] } = await response.json()

    return (
        <ProductPage
            product={accessory}
            recommended={recommended}
            type="accessories"
            backRoute="/categories/accessories"
        />
    )
}