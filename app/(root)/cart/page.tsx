import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description: "Review your selected items and proceed to checkout.",
};

export default function Cart() {
    return (
        <section>
            <div className="section-container">
                Cart
            </div>
        </section>
    )
}
