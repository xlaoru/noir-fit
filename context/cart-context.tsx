"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { CartItem, ICartContext, StoreItem } from "@/utils/models"
import { getProductKey } from "@/utils/getProductKey"

const CartContext = createContext<ICartContext | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return []
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    function add(product: StoreItem) {
        const key = getProductKey(product)

        setItems((prev) => {
            const existing = prev.find((item) => item.key === key)

            if (existing) {
                return prev.map((item) =>
                    item.key === key
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, key, quantity: 1 }]
        })
    }

    function remove(key: string) {
        setItems((prev) => prev.filter((item) => item.key !== key))
    }

    function increase(key: string) {
        setItems((prev) => prev.map((item) =>
            item.key === key
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ))
    }

    function decrease(key: string) {
        setItems(prev =>
            prev
                .map((item) =>
                    item.key === key
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, add, remove, increase, decrease, total }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)!