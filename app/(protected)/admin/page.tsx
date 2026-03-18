import AdminPage from "@/components/pages/AdminPage";
import { isAdmin } from "@/lib/services/is-admin.service";
import { requireUser } from "@/lib/services/require-user.service";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Manage your store's products, orders, and users.",
};

export default async function AdminDashboard() {
    const user = await requireUser()
    
    if (!user) {
        redirect("/api/auth/refresh")
    }

    const admin = await isAdmin(user.id)
    
    if (!admin) {
        redirect("/")
    }

    return (
        <AdminPage />
    )
}