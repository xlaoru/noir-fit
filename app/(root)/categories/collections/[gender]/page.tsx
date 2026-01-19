import ProductCard from "@/components/ProductCard"
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

    const reponse = await fetch(`${process.env.URL}/api/categories/collections/${gender}`)

    if (!reponse.ok) {
        return <div>Error!</div>
    }

    const { products }: { products: IProduct[] } = await reponse.json()
    console.log(products)

    return (
        <section>
            <div className="section-container">
                Collection for {gender}
                <br />
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        image={p.images[0]}
                        tags={p.tags}
                        title={p.title}
                        price={p.price}
                        slug={`/categories/collections/${p.gender.toLowerCase()}/${p.slug}`}
                    />
                ))}
            </div>
        </section>
    )
}