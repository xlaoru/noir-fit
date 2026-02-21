"use client"

import { IPaymentFormProps } from "@/utils/models";
import { X } from "lucide-react";

export default function PaymentForm({
    cardNumber,
    expireDate,
    cvv,
    nameOfCard,
    setEditingPayment
}: IPaymentFormProps) {
    return (
        <form
            className="z-1000 p-6 rounded-sm w-[30%] flex flex-col gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-950"
            action={() => setEditingPayment(false)}
        >
            <div className="flex items-center justify-between mb-2">
                <h5>Payment Method Editing</h5>
                <X className="cursor-pointer hover:text-zinc-300" onClick={() => setEditingPayment(false)} />
            </div>
            <label
                htmlFor="cardNumber"
                className="text-sm text-zinc-400"
            >
                Card Number
            </label>
            <input
                id="cardNumber"
                name="cardNumber"
                type="cardNumber"
                defaultValue={cardNumber}
                required
                placeholder="0000 0000 0000 0000"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="expireDate"
                className="text-sm text-zinc-400"
            >
                Expire Date
            </label>
            <input
                id="expireDate"
                name="expireDate"
                type="expireDate"
                defaultValue={expireDate}
                required
                placeholder="01/01"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="cvv"
                className="text-sm text-zinc-400"
            >
                CVV
            </label>
            <input
                id="cvv"
                name="cvv"
                type="cvv"
                defaultValue={cvv}
                required
                placeholder="123"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="nameOfCard"
                className="text-sm text-zinc-400"
            >
                Name of Card
            </label>
            <input
                id="nameOfCard"
                name="nameOfCard"
                type="nameOfCard"
                defaultValue={nameOfCard}
                required
                placeholder="John Doe"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <button type="submit" className="mt-2 bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Save Changes</button>
        </form>
    )
}
