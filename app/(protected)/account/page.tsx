import { requireUser } from "@/lib/services/require-user.service";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Account",
    description: "Manage your profile, orders, and preferences in one place.",
};

export default async function Account() {
    const user = await requireUser()


    return (
        <section>
            <div className="section-container">
                Account: {user?.email}
            </div>
        </section>
    )
}
