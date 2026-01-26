"use client"

import CartCard from "../CartCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CartPage() {
    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h2 className="text-left">Shopping Cart</h2>
                    <p className="text-sm">
                        {0} items
                    </p>
                </div>
                {
                    0 === 0
                        ? (
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div className="bg-zinc-900 text-zinc-600 border border-zinc-800 p-6 rounded-full">
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <circle cx="9" cy="21" r="1" />
                                        <circle cx="20" cy="21" r="1" />
                                        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                                    </svg>
                                </div>
                                <h3>Your cart is empty</h3>
                                <p className="text-sm">Add some items to get started.</p>
                                <Link href="/#categories"><button className="px-6 py-3 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors">Browse Products</button></Link>
                            </div>
                        )
                        : (
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-[0_0_60%] w-full flex flex-col gap-4">
                                    {/* {[].map((item) => (
                                        <CartCard
                                            key={item.key}
                                            title={item.title}
                                            price={item.price}
                                            images={item.images}
                                            slug={item.slug}
                                            type={item.type}
                                            cartKey={item.key}
                                            quantity={item.quantity}
                                            {...("gender" in item ? { gender: item.gender } : {})}
                                        />
                                    ))} */}
                                </div>
                                <div className="flex-[0_0_40%] w-full">
                                    <div className="sticky top-24 p-6 rounded-sm bg-zinc-900 border border-white/5 shadow-xl flex flex-col gap-5">
                                        <div className="flex flex-col gap-5 pb-5 border-b border-zinc-800">
                                            <h5>Order Summary</h5>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-zinc-400">Subtotal</p>
                                                <p className="text-sm text-zinc-100">${0.00.toFixed(2)}</p>
                                            </div>
                                            {
                                                0 / 10 >= 12
                                                    ? (
                                                        <div className="flex justify-between">
                                                            <p className="text-sm text-zinc-400">Shipping</p>
                                                            <p className="text-sm text-zinc-100">Free</p>
                                                        </div>
                                                    )
                                                    : (
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <p className="text-sm text-zinc-400">Shipping</p>
                                                                <p className="text-sm text-zinc-100">${(0 / 10).toFixed(2)}</p>
                                                            </div>
                                                            <p></p>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex justify-between">
                                                <h6>Total</h6>
                                                <h6>${(0 + (0 / 10)).toFixed(2)}</h6>
                                            </div>
                                            <Link href="/" className="block w-full"><button className="w-full flex items-center justify-center gap-2 px-6 py-3 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors">Checkout <ArrowRight width={18} height={18} /></button></Link>
                                            <p className="text-center">Secure checkout powered by Stripe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </section >
    )
}
