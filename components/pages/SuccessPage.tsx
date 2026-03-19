"use client"

import { useCart } from "@/context/cart-context";
import { ISuccessPageProps } from "@/utils/models";
import { ArrowRight, CircleCheck, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage({ orderId }: ISuccessPageProps) {
    const { clear } = useCart()

    useEffect(() => {
        clear()
    }, [])

    return (
        <section>
            <div className="section-container flex flex-col items-center gap-10">
                <div className="w-[80px] h-[80px] bg-zinc-100 flex items-center justify-center rounded-full">
                    <CircleCheck className="text-zinc-950" width={45} height={45} />
                </div>
                <h2>Order Confirmed</h2>
                <p className="text-center text-xl text-zinc-400">Thank you for choosing Noir Fit. Your performance gear is <br /> being prepared for shipment.</p>
                <div className="flex justify-between gap-4 w-[700px]">
                    <div className="flex flex-col gap-1 bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex-1">
                        <p className="uppercase text-md font-bold">Order Number</p>
                        <p className="text-zinc-100 text-xl">{orderId}</p>
                    </div>
                    <div className="flex flex-col gap-1 bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex-1">
                        <p className="uppercase text-md font-bold">Estimated Delivery</p>
                        <p className="text-zinc-100 text-xl">3-5 Business Days</p>
                    </div>
                </div>
                <div className="flex gap-4 p-7 rounded-xl bg-zinc-900 border border-zinc-800 w-[700px]">
                    <div className="w-[48px] h-[48px] bg-zinc-800 text-zinc-400 p-3 rounded-full">
                        <Package />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5>Track your shipment</h5>
                        <p className="text-sm">We&apos;ve sent a confirmation email to your inbox with a tracking link. You can also view your order <br /> history in your account.</p>
                        <Link href="/account" className="w-fit"><button className="rounded-sm bg-zinc-950 border border-zinc-800 py-2 px-3 text-sm text-zinc-300 font-bold cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-100">View Account</button></Link>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/">
                        <button className="px-6 py-3 flex items-center gap-2 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors">
                            Return Home <ArrowRight width={18} height={18} />
                        </button>
                    </Link>
                    <Link href="/categories/apparel/men">
                        <button className="px-6 py-3 flex items-center gap-2 cursor-pointer text-zinc-300 font-semibold rounded-sm bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 hover:text-zinc-100 transition-colors">
                            <ShoppingCart width={18} height={18} /> Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
