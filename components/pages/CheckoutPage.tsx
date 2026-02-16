"use client"

import { useCart } from "@/context/cart-context";
import { ICheckoutPageProps } from "@/utils/models";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import CartCard from "../CartCard";
import CheckoutCard from "../CheckoutCard";

export default function CheckoutPage({ email, phoneNumber, firstName, lastName, address, city, country, zipCode }: ICheckoutPageProps) {
    const { items, subtotal, shipping, total } = useCart()
    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <Link href="/cart"><ArrowLeft width={22} height={22} className="text-zinc-600 hover:text-zinc-100 cursor-pointer transition-colors" /></Link><h2 className="text-left">Checkout</h2>
                    </div>
                    <div>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-[0_0_55%] w-full flex flex-col gap-4">
                                <form className="flex flex-col gap-2">
                                    <h5>Contact Information</h5>
                                    <label
                                        htmlFor="email"
                                        className="text-sm text-zinc-400"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={() => { }}
                                        required
                                        placeholder="example@mail.com"
                                        className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                    />
                                    <label
                                        htmlFor="phoneNumber"
                                        className="text-sm text-zinc-400"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="phoneNumber"
                                        value={phoneNumber}
                                        onChange={() => { }}
                                        required
                                        placeholder="+38 (123) 456 7890"
                                        className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                    />
                                    <hr className="border border-zinc-800 my-5" />
                                    <h5>Shipping Address</h5>
                                    <div className="flex justify-between gap-3">
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="text-sm text-zinc-400"
                                            >
                                                Firts Name
                                            </label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="firstName"
                                                value={firstName}
                                                onChange={() => { }}
                                                required
                                                placeholder="John"
                                                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="text-sm text-zinc-400"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="lastName"
                                                value={lastName}
                                                onChange={() => { }}
                                                required
                                                placeholder="Doe"
                                                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                            />
                                        </div>
                                    </div>
                                    <label
                                        htmlFor="address"
                                        className="text-sm text-zinc-400"
                                    >
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="address"
                                        value={address}
                                        onChange={() => { }}
                                        required
                                        placeholder="742 Evergreen Terrace"
                                        className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                    />
                                    <div className="flex justify-between gap-3">
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label
                                                htmlFor="city"
                                                className="text-sm text-zinc-400"
                                            >
                                                City
                                            </label>
                                            <input
                                                id="city"
                                                name="City"
                                                type="city"
                                                value={city}
                                                onChange={() => { }}
                                                required
                                                placeholder="New York"
                                                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label
                                                htmlFor="country"
                                                className="text-sm text-zinc-400"
                                            >
                                                Country
                                            </label>
                                            <input
                                                id="country"
                                                name="country"
                                                type="country"
                                                value={country}
                                                onChange={() => { }}
                                                required
                                                placeholder="United States"
                                                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <label
                                                htmlFor="zipCode"
                                                className="text-sm text-zinc-400"
                                            >
                                                Zip Code
                                            </label>
                                            <input
                                                id="zipCode"
                                                name="zipCode"
                                                type="zipCode"
                                                value={zipCode}
                                                onChange={() => { }}
                                                required
                                                placeholder="10001"
                                                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                            />
                                        </div>
                                    </div>
                                    <Link href="/payment" className="self-end"><button className="mt-3 w-fit flex items-center justify-center gap-2 px-6 py-3 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors" type="button">Continue to Payment <ArrowRight width={18} height={18} /></button></Link>
                                </form>
                            </div>
                            <div className="flex-[0_0_45%] w-full">
                                <div className="sticky top-24 p-6 rounded-sm bg-zinc-900 border border-white/5 shadow-xl flex flex-col gap-5">
                                    <h5>Order Summary</h5>
                                    <div className="flex flex-col gap-5">
                                        {items.map((item) => (
                                            <CheckoutCard
                                                key={item.id}
                                                image={item.images[0]}
                                                title={item.title}
                                                price={item.price}
                                                quantity={item.quantity}
                                            />
                                        ))}
                                    </div>
                                    <hr className="border border-zinc-700" />
                                    <div className="flex justify-between">
                                        <p className="text-sm text-zinc-400">Subtotal</p>
                                        <p className="text-sm text-zinc-100">${subtotal}</p>
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
            </div>
        </section>
    )
}
