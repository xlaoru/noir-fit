import ProductCard from "@/components/ProductCard"
import { IShortedCollection } from "@/utils/models"

export async function generateMetadata({ params }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    return {
        title: `For ${gender.charAt(0).toUpperCase() + gender.slice(1)}`,
        description: `Performance-driven essentials designed for training, recovery, and everyday movement.`
    }
}

export default async function Collection({ params, }: { params: Promise<{ gender: string }> }) {
    const { gender } = await params

    const reponse = await fetch(`${process.env.URL}/api/categories/collections/${gender}`)

    if (!reponse.ok) {
        return <div>Error!</div>
    }

    const { collections }: { collections: IShortedCollection[] } = await reponse.json()

    return (
        <section>
            <div className="section-container">
                Collection for {gender}
                <br />
                {collections.map((collection) => (
                    <ProductCard
                        key={collection.title}
                        image={collection.image}
                        title={collection.title}
                        price={collection.price}
                        category={collection.category}
                        route={`/categories/collections/${collection.gender.toLowerCase()}/${collection.slug}`}
                    />
                ))}
            </div>
        </section>
    )
}