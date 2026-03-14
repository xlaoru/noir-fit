import SuccessPage from "@/components/pages/SuccessPage"
import { compareIdOfUserAndOrderOwner } from "@/lib/services/compare-id-of-user-and-order-owner.service";
import { requireUser } from "@/lib/services/require-user.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Success",
    description: "Your order has been successfully placed. View your order details and estimated delivery information."
};

export default async function Success({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string }>
}) {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    const params = await searchParams

    const orderId = params.orderId

    if (!orderId) {
        throw new Error("Missing orderId")
    }

    await compareIdOfUserAndOrderOwner(user.id, orderId)

    return (
        <SuccessPage orderId={orderId} />
    )
}
