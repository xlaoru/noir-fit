import { useCart } from "@/context/cart-context";
import { ICartCardProps } from "@/utils/models";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartCard({ title, price, image, gender, slug, type, cartKey, quantity }: ICartCardProps) {
    const { remove, increase, decrease } = useCart()
    return (
        <div className="flex justify-between bg-zinc-900 border border-zinc-800 rounded-sm p-3">
            <div className="flex gap-3">
                <Link href={`/categories/${type}/${gender ? `${gender.toLowerCase()}/` : ""}${slug}`}>
                    <div className="relative w-[96px] h-[96px] rounded-sm overflow-hidden bg-zinc-800">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
                <div className="flex flex-col gap-3">
                    <h6>{title}</h6>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => decrease(cartKey)}
                            className="p-1 bg-zinc-800 cursor-pointer text-zinc-500 rounded-sm hover:bg-zinc-700 hover:text-zinc-400 transition-colors"
                        >
                            <Minus className="w-5 h-5" />
                        </button>
                        <h6 className="font-normal">{quantity}</h6>
                        <button
                            onClick={() => increase(cartKey)}
                            className="p-1 bg-zinc-800 cursor-pointer text-zinc-500 rounded-sm hover:bg-zinc-700 hover:text-zinc-400 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid h-full grid-rows-[1fr_auto_1fr] place-items-end">
                <h6 className="self-start">${price}</h6>
                <button
                    className="cursor-pointer"
                    onClick={() => remove(cartKey)}
                >
                    <Trash2 className="text-zinc-300 w-5 h-5 hover:text-red-600 transition-colors" />
                </button>
            </div>
        </div >
    )
}
