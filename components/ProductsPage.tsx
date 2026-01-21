"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { useState, useEffect } from "react"

import { IShortedAccessory, IShortedCloth, IShortedNutrition } from "@/utils/models";
import Filters from "./Filters";
import ProductCard from "./ProductCard";

import { X } from 'lucide-react';

interface IProductsPageProps {
    title: string;
    body: string;
    type: "collections" | "accessories" | "nutrition"
    gender?: string;
    initialProducts: (IShortedCloth | IShortedAccessory | IShortedNutrition)[];
    categories: string[]
}

export default function ProductsPage({ title, body, type, gender, initialProducts, categories }: IProductsPageProps) {
    const searchParams = useSearchParams()

    const initialCategory = searchParams.get("category")
    const initialSort = searchParams.get("sort") ?? "newest"

    const [products, setProducts] = useState(initialProducts)
    const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory)
    const [sort, setSort] = useState<string>(initialSort)

    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams()

        if (activeCategory) {
            params.set("category", activeCategory)
        }

        if (sort) {
            params.set("sort", sort)
        }

        fetch(`http://localhost:3000/api/categories/${type}/${gender ? gender : ""}?${params.toString()}`)
            .then(response => response.json())
            .then(data => setProducts(data[type]))
            .catch((e) => {
                console.error("Something went wrong:", e);
            })

        router.push(`?${params.toString()}`, { scroll: false })
    }, [type, gender, activeCategory, sort])

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
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        sort={sort}
                        setSort={setSort}
                    />
                    {
                        activeCategory !== null
                            ? (
                                <div className="flex gap-3 items-center">
                                    <p>Filtered by:</p>
                                    <button onClick={() => setActiveCategory(null)} className="flex items-center text-xs px-2 py-1 gap-1.5 capitalize rounded-sm bg-zinc-800 text-zinc-300 cursor-pointer">{activeCategory?.toLowerCase()} <X width={12} height={12} /></button>
                                </div>
                            )
                            : null
                    }
                    <div>
                        <p className="text-sm">{products.length} products</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((collection) => (
                            <ProductCard
                                key={collection.title}
                                image={collection.image}
                                title={collection.title}
                                price={collection.price}
                                category={collection.category}
                                route={`/categories/${type}/${"gender" in collection ? `${collection.gender.toLowerCase()}/` : ""}${collection.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
