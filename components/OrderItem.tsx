
import { OrderStatus } from "@/app/generated/prisma";
import { accentBackgroudColor, statusIcon } from "@/utils/colorStatus";
import { IOrderItemProps } from "@/utils/models";
import { Calendar, ChevronDown, ChevronUp, MapPin, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react"

export default function OrderItem({ id, firstName, lastName, address, city, country, zipCode, createdAt, status, total, items, slug }: IOrderItemProps) {
    const totalItemsQuanity = items.reduce((sum, item) => (sum + item.quantity), 0)
    
    const deliveryEstimate = new Date(createdAt)
    deliveryEstimate.setDate(deliveryEstimate.getDate() + 3)
    
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(createdAt)

    const formattedDeliveryEstimate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(deliveryEstimate)

    const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(total)

    function statusLabel(status: OrderStatus) {
        return status[0] + status.slice(1).toLowerCase()
    }

    const [isOpen, setOpen] = useState(false)

    return (
        <div className={`grid grid-cols-2 items-center gap-x-4 ${isOpen ? "gap-y-3" : "gap-y-0"} bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600 px-4 py-3 transition-colors hover:border-zinc-700 sm:grid-cols-[1.8fr_1fr_0.9fr_1fr_auto]`}>
            <div>
                <p className="text-md uppercase tracking-[0.14em] text-zinc-500">Order ID</p>
                <h5 className="truncate text-sm font-semibold text-zinc-100">{id}</h5>
            </div>
            <div>
                <p className="text-md uppercase tracking-[0.14em] text-zinc-500">Date</p>
                <h5 className="text-sm font-semibold text-zinc-100">{formattedDate}</h5>
            </div>
            <div>
                <p className="text-md uppercase tracking-[0.14em] text-zinc-500">Total</p>
                <h5 className="text-sm font-semibold text-zinc-100">{formattedTotal}</h5>
            </div>
            <div>
                <p className="text-md uppercase tracking-[0.14em] text-zinc-500">Status</p>
                <h5 className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${accentBackgroudColor(status)}`}>
                    {statusIcon(status)}
                    <span>{statusLabel(status)}</span>
                </h5>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1">
                <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-md font-semibold text-zinc-300">
                        {totalItemsQuanity} items
                    </span>
                </div>

                {
                    isOpen
                        ? (
                            <ChevronUp className="h-4 w-4 text-zinc-400" onClick={() => setOpen(false)} />
                        )
                        : (
                            <ChevronDown className="h-4 w-4 text-zinc-400" onClick={() => setOpen(true)} />
                        )
                }
            </div>
            <div
                className={`col-span-2 sm:col-span-5 grid ${
                    isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                } overflow-hidden transition-[grid-template-rows] duration-200 ease-in-out`}
                >
                <div className="min-h-0">
                    <p className="uppercase text-md font-bold">Items</p>
                    <div className="flex gap-10">
                        <ul className="w-[65%]">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between items-center gap-3 py-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-sm" />
                                        <div>
                                            <h6>{item.title}</h6>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <h6>${item.price}</h6>
                                </li>
                            ))}
                        </ul>
                        <div className="w-[35%] flex flex-col gap-5 bg-zinc-950 rounded-sm p-4 justify-center">
                            <div className="flex flex-col gap-2">
                                <p className="uppercase text-md font-bold flex gap-1"><MapPin width={16} height={16} /> Shipping Address</p>
                                <p className="text-sm text-zinc-400">{address}, {city}, {zipCode}, {country}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="uppercase text-md font-bold flex gap-1"><Calendar width={16} height={16} /> Delivery Estimate</p>
                                <p className="text-sm text-zinc-400">{formattedDeliveryEstimate}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="uppercase text-md font-bold flex gap-1"><User width={16} height={16} /> Author</p>
                                <p className="text-sm text-zinc-400">{firstName} {lastName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
