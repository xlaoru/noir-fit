import { OrderStatus } from "@/app/generated/prisma";
import UserPage from "@/components/pages/UserPage";
import { getUserOrders } from "@/lib/services/get-user-orders.service";
import { requireUser } from "@/lib/services/require-user.service";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Account",
    description: "Manage your profile, orders, and preferences in one place.",
};

export default async function Account({
    params,
    searchParams,
}: { params: Promise<{ slug: string }>, searchParams: { status?: OrderStatus | "All" } }) {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    const { slug } = await params

    const { status } = await searchParams

    const normalizedStatus = status === "All" ? "all" : status;
    const orders = await getUserOrders(user.id, normalizedStatus)

    const statuses = Object.keys(OrderStatus) as OrderStatus[]

    return (
        <UserPage
            email={user.email}
            phoneNumber={user.phoneNumber ?? ""}
            firstName={user.firstName ?? ""}
            lastName={user.lastName ?? ""}
            address={user.address ?? ""}
            city={user.city ?? ""}
            country={user.country ?? ""}
            zipCode={user.zipCode ?? ""}
            cardNumber={user.cardNumber ?? ""}
            expireDate={user.expireDate ?? ""}
            cvv={user.cvv ?? ""}
            nameOfCard={user.nameOfCard ?? ""}
            orders={orders}
            slug={slug}
            statuses={statuses}
            avatar={user.avatar}
        />
    )
}
