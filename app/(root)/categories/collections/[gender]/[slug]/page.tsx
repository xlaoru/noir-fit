import ProductPage from "@/components/ProductPage";
import { ICloth, IShortedCloth } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Cloth({ params, }: { params: Promise<{ gender: string, slug: string }> }) {
    const { gender, slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/collections/${gender}/${slug}`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { cloth, recommended }: { cloth: ICloth, recommended: IShortedCloth[] } = await response.json()

    return (
        <ProductPage
            product={cloth}
            recommended={recommended}
            type={gender}
            backRoute={`/categories/collections/${gender}`}
        />
    )
}