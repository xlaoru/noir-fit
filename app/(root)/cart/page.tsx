import CartPage from "@/components/pages/CartPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description: "Review your selected items and proceed to checkout.",
};

export default function Cart() {
    return (
        <CartPage />
    )
}
