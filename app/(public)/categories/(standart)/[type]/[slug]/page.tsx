import ProductPage from "@/components/pages/ProductPage"
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

    const response = await fetch(`${process.env.URL}/api/products/${type}/${slug}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const data = await response.json()


    const product: IFullProduct = data[type.toLowerCase()]
    const recommended: IProduct[] = data.recommended

    return (
        <ProductPage
            product={product}
            recommended={recommended}
            type={type}
            backRoute={`/categories/${type.toLowerCase()}`}
        />
    )
}
