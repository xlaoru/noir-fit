import ProductsPage from "@/components/pages/ProductsPage";
import { IShortedAccessory } from "@/utils/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accessories",
    description: "Functional accessories designed to support training, recovery, and everyday performance.",
};

export default async function Accessories() {
    const reponse = await fetch(`${process.env.URL}/api/categories/accessories`)

    if (!reponse.ok) {
        return <div>!Error</div>
    }

    const { accessories, categories }: { accessories: IShortedAccessory[], categories: string[] } = await reponse.json()

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
