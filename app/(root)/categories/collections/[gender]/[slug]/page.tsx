import ProductCard from "@/components/ProductCard";
import { ICollectionProduct } from "@/utils/models"

import { ChevronLeft, Heart } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Product({ params, }: { params: Promise<{ gender: string, slug: string }> }) {
    const { gender, slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/collections/${gender}/${slug}`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { product }: { product: ICollectionProduct } = await response.json()

    return (
        <>
            <section>
                <div className="section-container pt-0 pb-25 border-b border-zinc-900">
                    <Link href={`/categories/collections/${gender}`}><p className="flex items-center gap-3 hover:text-zinc-100 transition-colors"><ChevronLeft width={14} height={14} /> <span>Back to <span className="lowercase">{gender}&apos;s</span> collection</span></p></Link>
                    <div className="pt-12 flex gap-20">
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
                                <p className="text-zinc-400">Color</p>
                                <div className="flex gap-2">
                                    {product.colors.map((color, index) => (
                                        <div key={index} className={`w-8 h-8 rounded-full border border-transparent hover:border-zinc-500 cursor-pointer transition-border`} style={{ backgroundColor: color }}></div>
                                    ))}
                                </div>
                                <p className="text-zinc-400">Size</p>
                                <div className="flex gap-2">
                                    {product.sizes.map((size, index) => (
                                        <div key={index} className="flex justify-center items-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-500 cursor-pointer hover:bg-zinc-800 transition-colors">{size}</div>
                                    ))}
                                </div>
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
                                    >
                                        <Heart />
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
            </section>
            <section>
                <div className="section-container pt-0 flex flex-col gap-10">
                    <h4 className="font-normal">You might also like</h4>
                    <div className="flex gap-5">
                        <ProductCard
                            image={product.images[0]}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            route={`/categories/collections/${product.gender.toLocaleLowerCase()}/${product.slug}`}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}