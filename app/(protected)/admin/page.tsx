import { Type } from "@/app/generated/prisma";
import AdminPage from "@/components/pages/AdminPage";
import prisma from "@/lib/prisma";
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

    const rawApparelCategories = await prisma.product.findMany({
        where: {
            type: Type.APPAREL
        },
        select: {
            category: true,
        },
        distinct: ["category"],
    })

    const rawNutritionCategories = await prisma.product.findMany({
        where: {
            type: Type.NUTRITION
        },
        select: {
            category: true,
        },
        distinct: ["category"],
    })
    
    const rawAccessoriesCategories = await prisma.product.findMany({
        where: {
            type: Type.ACCESSORIES
        },
        select: {
            category: true,
        },
        distinct: ["category"],
    })
    
    const categories = {
        apparel: rawApparelCategories.map((item) => item.category),
        nutrition: rawNutritionCategories.map((item) => item.category),
        accessories: rawAccessoriesCategories.map((item) => item.category),
    }

    return (
        <AdminPage categories={["Men", "Women", "Nutrition", "Accessories"]} subCategories={categories} />
    )
}