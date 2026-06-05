import CheckoutPage from "@/components/pages/CheckoutPage";
import { requireUser } from "@/lib/services/require-user.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your purchase by providing shipping information and reviewing your order. Fast, secure, and simple checkout process."
};

export default async function Checkout() {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    return (
        <CheckoutPage
            email={user.email}
            phoneNumber={user.phoneNumber ?? ""}
            firstName={user.firstName ?? ""}
            lastName={user.lastName ?? ""}
            address={user.address ?? ""}
            city={user.city ?? ""}
            country={user.country ?? ""}
            zipCode={user.zipCode ?? ""}
        />
    )
}
