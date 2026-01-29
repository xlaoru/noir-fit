import ProductPage from "@/components/pages/ProductPage";
import { formatSlugToTitle } from "@/utils/formatSlugToTitle";
import { IFullProduct, IProduct } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = formatSlugToTitle(slug)

    return {
        title,
        description: `Here you can see more info about ${title}.`
    }
}

export default async function Apparel({ params, }: { params: Promise<{ gender: string, slug: string }> }) {
    const { gender, slug } = await params

    const response = await fetch(`${process.env.URL}/api/products/apparel/${gender}/${slug}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { apparel, recommended }: { apparel: IFullProduct, recommended: IProduct[] } = await response.json()

    return (
        <ProductPage
            product={apparel}
            recommended={recommended}
            type="APPAREL"
            backRoute={`/categories/apparel/${gender}`}
        />
    )
}