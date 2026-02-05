import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account",
    description: "Manage your profile, orders, and preferences in one place.",
};

export default async function Account() {
    return (
        <section>
            <div className="section-container">
                Account
            </div>
        </section>
    )
}
