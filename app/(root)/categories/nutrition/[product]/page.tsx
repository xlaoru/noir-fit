export async function generateMetadata({ params }: { params: Promise<{ product: string }> }) {
    const { product } = await params

    return {
        title: product,
        description: `Here you can see more info about ${product}.`
    }
}

export default async function Product({ params, }: { params: Promise<{ product: string }> }) {
    const { product } = await params
    return (
        <section>
            <div className="section-container">
                Product {product}
            </div>
        </section>
    )
}