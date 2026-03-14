import { OrderStatus } from "@/app/generated/prisma"
import { CheckCheck, CircleX, Clock3, Truck } from "lucide-react"

export function accentBackgroudColor(status: OrderStatus) {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
            case "PAID":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            case "SHIPPED":
                return "bg-sky-500/20 text-sky-300 border-sky-500/30"
            case "DELIVERED":
                return "bg-lime-500/20 text-lime-300 border-lime-500/30"
            case "CANCELLED":
                return "bg-rose-500/20 text-rose-300 border-rose-500/30"
        }
    }

export function statusIcon(status: OrderStatus) {
    switch (status) {
        case "PENDING":
            return <Clock3 className="h-3.5 w-3.5" />
        case "PAID":
        case "DELIVERED":
            return <CheckCheck className="h-3.5 w-3.5" />
        case "SHIPPED":
            return <Truck className="h-3.5 w-3.5" />
        case "CANCELLED":
            return <CircleX className="h-3.5 w-3.5" />
    }
}