import ProductPage from "@/components/pages/ProductPage"
import { getCurrentProduct } from "@/lib/services/get-products.service"
import { formatSlugToTitle } from "@/utils/formatSlugToTitle"
import { IFullProduct, IProduct, Type } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = formatSlugToTitle(slug)

    return {
        title,
        description: `Here you can see more info about ${title}.`
    }
}

export default async function Product({ params, }: { params: Promise<{ type: Type, slug: string }> }) {
    const { type, slug } = await params

    const { product, recommended } = await getCurrentProduct(slug)

    return (
        <ProductPage
            product={product}
            recommended={recommended}
            type={type}
            backRoute={`/categories/${type.toLowerCase()}`}
        />
    )
}
