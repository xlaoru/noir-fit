import ProductCard from "@/components/ProductCard";
import { IShortedNutrition } from "@/utils/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nutrition",
    description: "Essential sports nutrition formulated to support training, recovery, and performance.",
};

export default async function Nutrition() {
    const response = await fetch(`${process.env.URL}/api/categories/nutrition`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { nutrition }: { nutrition: IShortedNutrition[] } = await response.json()

    return (
        <section>
            <div className="section-container">
                Nutrition
                {nutrition.map((nutritionItem) => (
                    <ProductCard
                        key={nutritionItem.title}
                        image={nutritionItem.image}
                        title={nutritionItem.title}
                        price={nutritionItem.price}
                        category={nutritionItem.category}
                        route={`/categories/nutrition/${nutritionItem.slug}`}
                    />
                ))}
            </div>
        </section>
    )
}
