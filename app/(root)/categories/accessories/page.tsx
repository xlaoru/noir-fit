import ProductCard from "@/components/ProductCard";
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

    const { accessories }: { accessories: IShortedAccessory[] } = await reponse.json()

    return (
        <section>
            <div className="section-container">
                Accessories
                {accessories.map((accessory) => (
                    <ProductCard
                        key={accessory.title}
                        image={accessory.image}
                        title={accessory.title}
                        price={accessory.price}
                        category={accessory.category}
                        route={`/categories/accessories/${accessory.slug}`}
                    />
                ))}
            </div>
        </section>
    )
}
