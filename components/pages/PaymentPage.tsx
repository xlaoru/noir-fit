"use client"

import { useCart } from "@/context/cart-context";
import { createOrder } from "@/lib/actions/create-order.action";
import { IPaymentPageProps } from "@/utils/models";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function PaymentPage({ cardNumber, expireDate, cvv, nameOfCard }: IPaymentPageProps) {
    const { items, total, shipping, amount } = useCart()

    if (items.length <= 0) {
        redirect("/cart")
    }

    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <div className="flex items-center gap-5">
                    <Link href="/checkout"><ArrowLeft width={22} height={22} className="text-zinc-600 hover:text-zinc-100 cursor-pointer transition-colors" /></Link><h2 className="text-left">Payment</h2>
                </div>
                <div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-[0_0_55%] w-full flex flex-col gap-4 p-6 rounded-sm bg-zinc-900 border border-white/5 shadow-xl">
                            <form className="flex flex-col gap-2" action={createOrder.bind(null, items, total)}>
                                <h5>Creadit Card</h5>
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
                                    className="h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                />
                                <div className="flex justify-between gap-3">
                                    <div className="flex flex-col gap-2 flex-1">
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
                                            placeholder="MM/YY"
                                            className="h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
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
                                            className="h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                        />
                                    </div>
                                </div>
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
                                    className="h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                />
                                <button className="mt-3 flex items-center justify-center gap-2 px-6 py-3 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors" type="submit">Pay <span className="font-bold">${total.toFixed(2)}</span></button>
                            </form>
                        </div>
                        <div className="flex-[0_0_45%] w-full">
                            <div className="sticky top-24 p-6 rounded-sm bg-zinc-900 border border-white/5 shadow-xl flex flex-col gap-5">
                                <h5>Review Order</h5>
                                <div className="flex justify-between">
                                    <p className="text-sm text-zinc-400">Items ({amount})</p>
                                    <p className="text-sm text-zinc-100">${total.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-zinc-400">Shipping</p>
                                    <p className="text-sm text-zinc-100">{shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}</p>
                                </div>
                                <hr className="border border-zinc-700" />
                                <div className="flex justify-between">
                                    <h5>Total</h5>
                                    <h5>${total.toFixed(2)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
