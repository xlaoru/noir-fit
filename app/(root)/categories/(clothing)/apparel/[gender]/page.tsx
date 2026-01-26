import ProductsPage from "@/components/pages/ProductsPage"
import { IProduct } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    return {
        title: `For ${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Apparel({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    const response = await fetch(`${process.env.URL}/api/products/apparel/${gender}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { apparel, categories }: { apparel: IProduct[], categories: string[] } = await response.json()

    return (
        <ProductsPage
            title={`${gender.toLowerCase()}'s Collection`}
            body="Training apparel and running gear engineered for peak performance."
            type="APPAREL"
            gender={gender}
            initialProducts={apparel}
            categories={categories}
        />
    )
}