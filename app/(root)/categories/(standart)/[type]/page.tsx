import ProductsPage from "@/components/pages/ProductsPage";
import { Type, IProduct } from "@/utils/models";

export async function generateMetadata({ params }: { params: Promise<{ type: Type }> }) {
    const { type } = await params

    return {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Products({ params }: { params: Promise<{ type: Type }> }) {
    const { type } = await params

    const response = await fetch(`${process.env.URL}/api/products/${type}`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const data = await response.json()

    const products: IProduct[] = data[type]
    const categories: string[] = data.categories

    return (
        <ProductsPage
            title={`${type.charAt(0).toUpperCase() + type.slice(1)} Collection`}
            body="Performance-driven essentials designed to support your training, recovery, and everyday movement."
            type={type}
            initialProducts={products}
            categories={categories}
        />
    )
}