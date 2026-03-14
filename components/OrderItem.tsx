
import { OrderStatus } from "@/app/generated/prisma";
import { accentBackgroudColor, statusIcon } from "@/utils/colorStatus";
import { IOrderItemProps } from "@/utils/models";
import { ChevronDown } from "lucide-react";

export default function OrderItem({ id, firstName, lastName, address, city, country, zipCode, createdAt, status, total, items, slug }: IOrderItemProps) {
    const totalItemsQuanity = items.reduce((sum, item) => (sum + item.quantity), 0)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(createdAt)

    const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(total)

    function statusLabel(status: OrderStatus) {
        return status[0] + status.slice(1).toLowerCase()
    }

    return (
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-600 px-4 py-3 transition-colors hover:border-zinc-700 sm:grid-cols-[1.8fr_1fr_0.9fr_1fr_auto]">
            <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Order ID</p>
                <h5 className="truncate text-sm font-semibold text-zinc-100">{id}</h5>
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Date</p>
                <h5 className="text-sm font-semibold text-zinc-100">{formattedDate}</h5>
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Total</p>
                <h5 className="text-sm font-semibold text-zinc-100">{formattedTotal}</h5>
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Status</p>
                <h5 className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${accentBackgroudColor(status)}`}>
                    {statusIcon(status)}
                    <span>{statusLabel(status)}</span>
                </h5>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1">
                <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                        {totalItemsQuanity} items
                    </span>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
            </div>
        </div>
    )
}
