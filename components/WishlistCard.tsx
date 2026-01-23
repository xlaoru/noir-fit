import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { IWishlistCardProps } from "@/utils/models";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function WishlistCard({ id, title, price, image, category, gender, slug, type }: IWishlistCardProps) {
    const { add } = useCart()
    const { toggle } = useWishlist()
    return (
        <Link href={`/categories/${type}/${gender ? `${gender.toLowerCase()}/` : ""}${slug}`}>
            <div className="group flex flex-col gap-1 w-[286px]">
                <div className="relative w-[286px] h-[381px] overflow-hidden rounded-xl">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <button
                        className="absolute top-2 right-2 p-2 cursor-pointer text-zinc-300 text-sm rounded-md bg-zinc-900 hover:bg-zinc-800 hover:text-red-600"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggle({
                                id,
                                type,
                                title,
                                price,
                                image,
                                category,
                                slug,
                                ...(gender && { gender })
                            })
                        }}
                    >
                        <Trash2 width={16} height={16} />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                            className="w-full flex justify-center items-center gap-3 cursor-pointer text-black text-sm font-semibold py-2 rounded-md bg-zinc-100 hover:bg-zinc-300 transition-colors"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                add({
                                    id,
                                    type,
                                    title,
                                    price,
                                    image,
                                    category,
                                    slug,
                                    ...(gender && { gender })
                                })
                            }}
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className="mt-3 flex flex-col gap-1.5">
                    <p className="uppercase text-xs text-zinc-400">{category}</p>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <p className="font-bold text-sm">${price}</p>
                </div>
            </div>
        </Link>
    )
}
