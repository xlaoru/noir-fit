import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist",
    description: "Save your favorite items and keep track of products you want to purchase later.",
};

export default function Wishlist() {
    return (
        <section>
            <div className="section-container">
                Wishlist
            </div>
        </section>
    )
}
