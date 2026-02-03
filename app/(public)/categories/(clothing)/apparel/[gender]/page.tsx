import ProductsPage from "@/components/pages/ProductsPage"
import { getAllApparel } from "@/lib/services/get-apparel.sevice"

export async function generateMetadata({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    return {
        title: `For ${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Apparel({
    params,
    searchParams,
}: {
    params: { gender: string }
    searchParams: { category?: string; sort?: string }
}) {
    const { gender } = await params
    const { category, sort } = await searchParams

    const { apparel, categories } = await getAllApparel(
        gender,
        category,
        sort,
    )

    return (
        <ProductsPage
            title={`${gender.toLowerCase()}'s Collection`}
            body="Training apparel and running gear engineered for peak performance."
            type="APPAREL"
            gender={gender}
            products={apparel}
            categories={categories}
        />
    )
}