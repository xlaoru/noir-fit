"use client"

import { useState, useEffect } from "react"

import { IShortedCloth } from "@/utils/models";
import Filters from "./Filters";
import ProductCard from "./ProductCard";

import { X } from 'lucide-react';

interface ICollectionClientProps {
    gender: string;
    initialCollections: IShortedCloth[];
    categories: string[]
}

export default function CollectionClient({ gender, initialCollections, categories }: ICollectionClientProps) {
    const [collections, setCollections] = useState(initialCollections)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [sort, setSort] = useState<string>("newest")

    useEffect(() => {
        const params = new URLSearchParams()

        if (activeCategory) {
            params.set("category", activeCategory)
        }

        if (sort) {
            params.set("sort", sort)
        }

        fetch(`http://localhost:3000/api/categories/collections/${gender}/?${params.toString()}`)
            .then(response => response.json())
            .then(data => setCollections(data.collections))
            .catch((e) => {
                console.error("Something went wrong:", e);
            })
    }, [gender, activeCategory, sort])

    return (
        <>
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
                        <p className="text-sm">{collections.length} products</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {collections.map((collection) => (
                            <ProductCard
                                key={collection.title}
                                image={collection.image}
                                title={collection.title}
                                price={collection.price}
                                category={collection.category}
                                route={`/categories/collections/${collection.gender.toLowerCase()}/${collection.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
