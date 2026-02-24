import { IOrderItemProps } from "@/utils/models";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function OrderItem({ id, firstName, lastName, address, city, country, zipCode, createdAt, status, total, items }: IOrderItemProps) {
    const totalItemsQuanity = items.reduce((sum, item) => (sum + item.quantity), 0)
    return (
        <Link href={``}>
            <li className="flex justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600">
                <div className="flex flex-col gap-1 justify-between">
                    <h6>{id}</h6>
                    <p>{createdAt.getDate()}.{createdAt.getMonth()}.{createdAt.getFullYear()} • {totalItemsQuanity} items</p>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-1 justify-between">
                        <span className="capitalize text-xs px-2 py-[2px] bg-zinc-600 text-zinc-100 rounded-sm w-fit">{status.toLowerCase()}</span>
                        <h6>${total}</h6>
                    </div>
                    <ChevronRight className="text-zinc-600" />
                </div>
            </li>
        </Link>
    )
}
