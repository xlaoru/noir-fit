import ProductPage from "@/components/pages/ProductPage";
import { formatSlugToTitle } from "@/utils/formatSlugToTitle";
import { ICloth, IShortedCloth } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = formatSlugToTitle(slug)

    return {
        title,
        description: `Here you can see more info about ${title}.`
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
            type={gender === "men" ? "men" : "women"}
            backRoute={`/categories/collections/${gender}`}
        />
    )
}