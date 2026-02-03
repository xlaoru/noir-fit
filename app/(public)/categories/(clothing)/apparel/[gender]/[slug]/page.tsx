import ProductPage from "@/components/pages/ProductPage";
import { getCurrentApparel } from "@/lib/services/get-apparel.sevice";
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

    const { apparel, recommended } = await getCurrentApparel(gender, slug)

    return (
        <ProductPage
            product={apparel}
            recommended={recommended}
            type="APPAREL"
            backRoute={`/categories/apparel/${gender}`}
        />
    )
}