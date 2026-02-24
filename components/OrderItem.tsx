import { OrderStatus } from "@/app/generated/prisma";
import { IOrderItemProps } from "@/utils/models";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function OrderItem({ id, firstName, lastName, address, city, country, zipCode, createdAt, status, total, items, slug }: IOrderItemProps) {
    const totalItemsQuanity = items.reduce((sum, item) => (sum + item.quantity), 0)

    function accentBackgroudColor(status: OrderStatus) {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500"
            case "PAID":
                return "bg-emerald-700"
            case "SHIPPED":
                return "bg-sky-700"
            case "DELIVERED":
                return "bg-lime-700"
            case "CANCELLED":
                return "bg-rose-700"
        }
    }

    return (
        <Link href={`/account/${slug}/${id}`}>
            <li className="flex justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600">
                <div className="flex flex-col gap-1 justify-between">
                    <h6>{id}</h6>
                    <p>{createdAt.getDate()}.{createdAt.getMonth()}.{createdAt.getFullYear()} • {totalItemsQuanity} items</p>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-1 items-end justify-between">
                        <span className={`capitalize text-xs px-2 py-[2px] ${accentBackgroudColor(status)} text-zinc-100 font-bold rounded-sm w-fit`}>{status.toLowerCase()}</span>
                        <h6>${total}</h6>
                    </div>
                    <ChevronRight className="text-zinc-600" />
                </div>
            </li>
        </Link>
    )
}
