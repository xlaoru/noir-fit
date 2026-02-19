import PaymentPage from "@/components/pages/PaymentPage";
import { requireUser } from "@/lib/services/require-user.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Payment",
    description: "Enter your payment details to securely complete your order. All transactions are encrypted and processed safely."
};

export default async function Payment() {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    return (
        <PaymentPage
            cardNumber={user.cardNumber ?? ""}
            expireDate={user.expireDate ?? ""}
            cvv={user.cvv ?? ""}
            nameOfCard={user.nameOfCard ?? ""}
        />
    )
}
