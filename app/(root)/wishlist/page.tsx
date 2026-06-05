import WishlistPage from "@/components/pages/WishlistPage";
import { getSavedProducts } from "@/lib/services/get-saved-products.service";
import { requireUser } from "@/lib/services/require-user.service";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Wishlist",
    description: "Save your favorite items and keep track of products you want to purchase later.",
};

export default async function Wishlist() {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    const { products } = await getSavedProducts(user.id)

    return (
        <WishlistPage products={products} />
    )
}
