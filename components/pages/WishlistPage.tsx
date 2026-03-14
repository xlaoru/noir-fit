"use client"

import Link from "next/link"
import WishlistCard from "../WishlistCard"
import { IWishlistPageProps } from "@/utils/models"
import { useState } from "react"
import { toggleWishlistAction } from "@/lib/actions/toggle-wishlist.action"

export default function WishlistPage({ products: initialProducts }: IWishlistPageProps) {
    const [products, setProducts] = useState(initialProducts)

    async function handleRemove(id: string) {
        await toggleWishlistAction(id)

        setProducts(prev =>
            prev.filter(p => p.id !== id)
        )
    }

    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h2 className="text-left">Wishlist</h2>
                    <p className="text-sm">
                        {products.length} items
                    </p>
                </div>
                {
                    products.length === 0
                        ? (
                            <div className="flex flex-col justify-center items-center gap-5">
                                <div className="bg-zinc-900 text-zinc-600 border border-zinc-800 p-6 rounded-full">
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                                    </svg>
                                </div>
                                <h3>Your wishlist is empty</h3>
                                <p className="text-sm">Start saving items you love.</p>
                                <Link href="/#categories"><button className="px-6 py-3 cursor-pointer text-black font-semibold rounded-sm bg-zinc-100 hover:bg-zinc-300 transition-colors">Browse Products</button></Link>
                            </div>
                        )
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.map((item) => (
                                    <WishlistCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        images={item.images}
                                        category={item.category}
                                        slug={item.slug}
                                        type={item.type}
                                        {...("gender" in item) ? { gender: item.gender } : {}}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </div>
                        )
                }
            </div>
        </section>
    )
}
