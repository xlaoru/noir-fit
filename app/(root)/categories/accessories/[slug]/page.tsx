import { IAccessory, IShortedAccessory } from "@/utils/models"
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