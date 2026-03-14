import { IOrdersProps } from "@/utils/models";
import OrderItem from "./OrderItem";
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default function Orders({ orders, slug, statuses }: IOrdersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentStatus = (searchParams.get("status") ?? "all").toLowerCase()

    useEffect(() => {
        if (searchParams.get("status")) {
            return
        }

        const params = new URLSearchParams(searchParams.toString())
        params.set("status", "all")

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, [pathname, router, searchParams])

    function updateStatus(status: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        params.set("status", status?.toLowerCase() ?? "all")

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h5>Order History</h5>
                <ul className="flex gap-2">
                    <li onClick={() => updateStatus("all")} className={`uppercase cursor-pointer inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${currentStatus == "all" ? "bg-zinc-100 text-zinc-800" : "bg-zinc-900 text-zinc-100"}`}>
                        All
                    </li>
                    {statuses.map((status) => (
                        <li onClick={() => updateStatus(status)} key={status} className={`cursor-pointer inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${currentStatus == status.toLowerCase() ? "bg-zinc-100 text-zinc-800" : "bg-zinc-900 text-zinc-100"}`}>
                            {status}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className="flex flex-col gap-3">
                {orders.map((item) => (<OrderItem key={item.id} {...item} slug={slug} />))}
            </ul>
        </div>
    )
}
