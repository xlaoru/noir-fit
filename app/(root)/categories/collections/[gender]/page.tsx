import ProductsPage from "@/components/pages/ProductsPage"
import { IProduct } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    return {
        title: `For ${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Collection({ params, }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    const response = await fetch(`${process.env.URL}/api/categories/collections/${gender}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { collections, categories }: { collections: IProduct[], categories: string[] } = await response.json()

    return (
        <ProductsPage
            title={`${gender.toLowerCase()}'s Collection`}
            body="Training apparel and running gear engineered for peak performance."
            type="collections"
            gender={gender}
            initialProducts={collections}
            categories={categories}
        />
    )
}