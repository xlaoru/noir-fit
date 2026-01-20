import CollectionClient from "@/components/CollectionClient"
import { IShortedCloth } from "@/utils/models"

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

    const { collections, categories }: { collections: IShortedCloth[], categories: string[] } = await reponse.json()

    return (
        <>
            <section className="border-b border-zinc-900">
                <div className="section-container py-0 flex flex-col gap-3">
                    <h2 className="text-left capitalize">{gender.toLowerCase()}&apos;s Collection</h2>
                    <p className="text-sm">Training apparel and running gear engineered for peak performance.</p>
                </div>
            </section>
            <CollectionClient
                gender={gender}
                initialCollections={collections}
                categories={categories}
            />
        </>
    )
}