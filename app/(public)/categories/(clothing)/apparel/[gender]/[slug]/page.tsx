import ProductPage from "@/components/pages/ProductPage";
import { getCurrentApparel } from "@/lib/services/get-apparel.sevice";
import { requireUser } from "@/lib/services/require-user.service";
import { formatSlugToTitle } from "@/utils/formatSlugToTitle";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = formatSlugToTitle(slug)

    return {
        title,
        description: `Here you can see more info about ${title}.`
    }
}

export default async function Apparel({ params, }: { params: Promise<{ gender: string, slug: string }> }) {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    const { gender, slug } = await params

    const { apparel, recommended } = await getCurrentApparel(user.id, gender, slug)

    return (
        <ProductPage
            product={apparel}
            recommended={recommended}
            type="APPAREL"
            backRoute={`/categories/apparel/${gender}`}
        />
    )
}