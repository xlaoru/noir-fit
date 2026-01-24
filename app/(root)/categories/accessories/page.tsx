import ProductsPage from "@/components/pages/ProductsPage";
import { IProduct } from "@/utils/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accessories",
    description: "Functional accessories designed to support training, recovery, and everyday performance.",
};

export default async function Accessories() {
    const response = await fetch(`${process.env.URL}/api/categories/accessories`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { accessories, categories }: { accessories: IProduct[], categories: string[] } = await response.json()

    return (
        <ProductsPage
            title="Accessories"
            body="Recovery tools, equipment, and essentials to complement your training."
            type="accessories"
            initialProducts={accessories}
            categories={categories}
        />
    )
}
