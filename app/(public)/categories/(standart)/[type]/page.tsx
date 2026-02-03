import ProductsPage from "@/components/pages/ProductsPage";
import { getAllProducts } from "@/lib/services/get-products.service";
import { Type } from "@/utils/models";

export async function generateMetadata({ params }: { params: Promise<{ type: Type }> }) {
    const { type } = await params

    return {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Products({
    params,
    searchParams,
}: {
    params: { type: string }
    searchParams: { category?: string; sort?: string }
}) {
    const { type } = await params
    const { category, sort } = await searchParams

    const { products, categories } = await getAllProducts(type, category, sort)

    return (
        <ProductsPage
            title={`${type.charAt(0).toUpperCase() + type.slice(1)} Collection`}
            body="Performance-driven essentials designed to support your training, recovery, and everyday movement."
            type={type.toUpperCase() as Type}
            products={products}
            categories={categories}
        />
    )
}