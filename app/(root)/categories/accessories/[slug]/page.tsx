export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Product({ params, }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <section>
            <div className="section-container">
                Product of accessories: {slug}
            </div>
        </section>
    )
}