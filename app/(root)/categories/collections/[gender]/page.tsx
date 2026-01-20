import Client from "@/components/Client"
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
            <Client
                title={`${gender.toLowerCase()}'s Collection`}
                body="Training apparel and running gear engineered for peak performance."
                type="collections"
                gender={gender}
                initialProducts={collections}
                categories={categories}
            />
        </>
    )
}