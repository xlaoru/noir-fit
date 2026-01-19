import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nutrition",
    description: "Essential sports nutrition formulated to support training, recovery, and performance.",
};

export default function Nutrition() {
    return (
        <section>
            <div className="section-container">
                Nutrition
            </div>
        </section>
    )
}
