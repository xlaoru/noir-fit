"use client"

import { IWishlistContext } from "@/utils/models";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const WishlistContext = createContext<IWishlistContext | null>(null)

export function WishlistProvider({ children, wishlistItemsQuantity }: PropsWithChildren<{ wishlistItemsQuantity: number }>) {
    const [quantity, setQuantity] = useState<number>(wishlistItemsQuantity)

    function add() {
        setQuantity((prev) => prev + 1)
    }

    function remove() {
        setQuantity((prev) => prev - 1)
    }

    function clear() {
        setQuantity(0)
    }

    const amount = quantity

    return (
        <WishlistContext.Provider value={{ quantity, add, remove, clear, amount }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext)!