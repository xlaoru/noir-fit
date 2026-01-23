"use client"

import { createContext, useContext, useState } from "react"
import { StoreItem, IWishlistContext, WishlistItem } from "@/utils/models"
import { getProductKey } from "@/utils/getProductKey"

const WishlistContext = createContext<IWishlistContext | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([])

    function toggle(product: StoreItem) {
        const key = getProductKey(product)

        setItems((prev) => {
            const exists = prev.find((item) => item.key === key)

            if (exists) {
                return prev.filter((item) => item.key !== key)
            }

            return [...prev, { ...product, key }]
        })
    }

    function has(key: string) {
        return items.some((item) => item.key === key)
    }

    const amount = items.length

    return (
        <WishlistContext.Provider value={{ items, toggle, has, amount }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext)!