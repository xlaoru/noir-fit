"use client"

import Link from "next/link";
import Image from "next/image";

import ProductCard from "../ProductCard";
import { ChevronLeft, Heart } from "lucide-react";
import { IProductPageProps } from "@/utils/models";

export default function ProductPage({ product, recommended, type, backRoute }: IProductPageProps) {
    return (
        <>
            <section>
                <div className="section-container pt-0 pb-25 border-b border-zinc-900">
                    <Link href={backRoute}><p className="flex items-center gap-3 hover:text-zinc-100 transition-colors"><ChevronLeft width={14} height={14} /> Back to {type.toLowerCase()}</p></Link>
                    <div className="pt-12 grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-16">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={1025}
                            height={700}
                            className="rounded-xl"
                        />
                        <div>
                            <div className="pt-6 pb-10 flex flex-col gap-6 border-b border-zinc-900">
                                <p>{product.category}</p>
                                <h2 className="font-normal text-left">{product.title}</h2>
                                <h3>${product.price}</h3>
                                <p className="text-zinc-400">{product.description}</p>
                                {
                                    product.colors && (
                                        <>
                                            <p className="text-zinc-400">Color</p>
                                            <div className="flex gap-2">
                                                {product.colors.map((color, index) => (
                                                    <div key={index} className={`w-8 h-8 rounded-full border border-transparent hover:border-zinc-500 cursor-pointer transition-border`} style={{ backgroundColor: color }}></div>
                                                ))}
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    product.sizes && (
                                        <>
                                            <p className="text-zinc-400">Size</p>
                                            <div className="flex gap-2">
                                                {product.sizes.map((size, index) => (
                                                    <div key={index} className="flex justify-center items-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-500 cursor-pointer hover:bg-zinc-800 transition-colors">{size}</div>
                                                ))}
                                            </div>
                                        </>
                                    )
                                }
                                <div className="flex gap-3">
                                    <button
                                        className="w-full flex justify-center items-center gap-3 cursor-pointer text-black text-sm font-semibold py-2 rounded-md bg-zinc-100 hover:bg-zinc-300"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <circle cx="9" cy="21" r="1" />
                                            <circle cx="20" cy="21" r="1" />
                                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <button
                                        className="p-4 cursor-pointer text-zinc-100 text-sm rounded-md border border-zinc-500 bg-zinc-900 hover:bg-zinc-800"
                                        onClick={() => {
                                        }}
                                    >
                                        {false ? <Heart fill="currentColor" /> : <Heart />}
                                    </button>
                                </div>
                            </div>
                            <div className="py-6 flex flex-col gap-5">
                                <h6 className="uppercase">Specifications</h6>
                                <div className="flex justify-between">
                                    <p>Material</p>
                                    <p className="text-zinc-100">{product.material}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Fit</p>
                                    <p className="text-zinc-100">{product.fit}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Care</p>
                                    <p className="text-zinc-100">{product.care}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Origin</p>
                                    <p className="text-zinc-100">{product.origin}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section>
                <div className="section-container pt-0 flex flex-col gap-10">
                    <h4 className="font-normal">You might also like</h4>
                    {
                        recommended.length === 0
                            ? (
                                <h3>Oops! Seems like we have not any <span className="capitalize">{product.category.toLowerCase()}</span> positions{product.gender && <span> for {product.gender.toLowerCase()}</span>}.</h3>
                            )
                            : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                    {
                                        recommended.map((recommendedItem) => (
                                            <ProductCard
                                                key={recommendedItem.title}
                                                id={recommendedItem.id}
                                                title={recommendedItem.title}
                                                price={recommendedItem.price}
                                                images={recommendedItem.images}
                                                category={recommendedItem.category}
                                                slug={recommendedItem.slug}
                                                type={recommendedItem.type}
                                                route={`/categories/${recommendedItem.type.toLowerCase()}/${recommendedItem.gender ? `${recommendedItem.gender.toLowerCase()}/` : ""}${recommendedItem.slug}`}
                                                {...("gender" in recommendedItem) ? { gender: recommendedItem.gender } : {}}
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            </section>
        </>
    )
}
