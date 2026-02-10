"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { IProductsPageProps } from "@/utils/models";
import Filters from "../Filters";
import ProductCard from "../ProductCard";

import { X } from 'lucide-react';

export default function ProductsPage({ title, body, type, gender, products, categories }: IProductsPageProps) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeCategory = searchParams.get("category")

    return (
        <>
            <section className="border-b border-zinc-900">
                <div className="section-container py-0 flex flex-col gap-3">
                    <h2 className="text-left capitalize">{title}</h2>
                    <p className="text-sm">{body}</p>
                </div>
            </section>
            <section>
                <div className="section-container py-0 flex flex-col gap-6">
                    <Filters
                        categories={categories}
                    />
                    {
                        activeCategory !== null
                            ? (
                                <div className="flex gap-3 items-center">
                                    <p>Filtered by:</p>
                                    <button onClick={() => {
                                        const params = new URLSearchParams(searchParams.toString())
                                        params.delete("category")

                                        router.push(`${pathname}?${params.toString()}`, { scroll: false })
                                    }} className="flex items-center text-xs px-2 py-1 gap-1.5 capitalize rounded-sm bg-zinc-800 text-zinc-300 cursor-pointer">{activeCategory?.toLowerCase()} <X width={12} height={12} /></button>
                                </div>
                            )
                            : null
                    }
                    <div>
                        <p className="text-sm">{products.length} products</p>
                    </div>
                    {
                        products.length === 0
                            ? (
                                <h3>Oops! Seems like we have not any <span className="capitalize">{activeCategory?.toLowerCase()}</span> positions<span>{gender ? ` for ${gender}` : ""}</span>.</h3>
                            )
                            : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.title}
                                            id={product.id}
                                            title={product.title}
                                            price={product.price}
                                            images={product.images}
                                            category={product.category}
                                            slug={product.slug}
                                            isSaved={product.isSaved}
                                            type={product.type}
                                            route={`/categories/${type.toLowerCase()}/${product.gender ? `${product.gender.toLowerCase()}/` : ""}${product.slug}`}
                                            {...("gender" in product ? { gender: product.gender } : {})}
                                        />
                                    ))}
                                </div>
                            )
                    }
                </div>
            </section>
        </>
    )
}
