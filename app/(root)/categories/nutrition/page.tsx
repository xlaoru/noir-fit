import ProductsPage from "@/components/pages/ProductsPage";
import { IShortedNutrition } from "@/utils/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nutrition",
    description: "Essential sports nutrition formulated to support training, recovery, and performance.",
};

export default async function Nutrition() {
    const response = await fetch(`${process.env.URL}/api/categories/nutrition`)

    if (!response.ok) {
        const { message }: { message: string } = await response.json()
        throw new Error(message)
    }

    const { nutrition, categories }: { nutrition: IShortedNutrition[], categories: string[] } = await response.json()

    return (
        <ProductsPage
            title="Nutrition"
            body="Sports nutrition to fuel your performance and accelerate recovery."
            type="nutrition"
            initialProducts={nutrition}
            categories={categories}
        />
    )
}
