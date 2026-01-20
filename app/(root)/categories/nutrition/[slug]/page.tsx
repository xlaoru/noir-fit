import ProductCard from "@/components/ProductCard"
import Link from "next/link"
import Image from "next/image"
import { INutrition } from "@/utils/models"
import { ChevronLeft, Heart } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return {
        title: slug,
        description: `Here you can see more info about ${slug}.`
    }
}

export default async function Nutration({ params, }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const response = await fetch(`${process.env.URL}/api/categories/nutrition/${slug}`)

    if (!response.ok) {
        return <div>Error!</div>
    }

    const { nutrition }: { nutrition: INutrition } = await response.json()

    return (
        <>
            <section>
                <div className="section-container pt-0 pb-25 border-b border-zinc-900">
                    <Link href="/categories/nutrition"><p className="flex items-center gap-3 hover:text-zinc-100 transition-colors"><ChevronLeft width={14} height={14} /> Back to nutrition&apos;s collection</p></Link>
                    <div className="pt-12 flex gap-20">
                        <Image
                            src={nutrition.images[0]}
                            alt={nutrition.title}
                            width={1025}
                            height={700}
                            className="rounded-xl"
                        />
                        <div>
                            <div className="pt-6 pb-10 flex flex-col gap-6 border-b border-zinc-900">
                                <p>{nutrition.category}</p>
                                <h2 className="font-normal text-left">{nutrition.title}</h2>
                                <h3>${nutrition.price}</h3>
                                <p className="text-zinc-400">{nutrition.description}</p>
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
                                    <p className="text-zinc-100">{nutrition.material}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Fit</p>
                                    <p className="text-zinc-100">{nutrition.fit}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Care</p>
                                    <p className="text-zinc-100">{nutrition.care}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Origin</p>
                                    <p className="text-zinc-100">{nutrition.origin}</p>
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
                            image={nutrition.images[0]}
                            title={nutrition.title}
                            price={nutrition.price}
                            category={nutrition.category}
                            route={`/categories/nutrition/${nutrition.slug}123`}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}