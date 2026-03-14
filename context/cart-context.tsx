"use client"

import { createContext, useContext, useState } from "react"
import { ICartItem, ICartContext, IProduct } from "@/utils/models"

const CartContext = createContext<ICartContext | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ICartItem[]>([])

    function add(product: IProduct) {
        const id = product.id

        setItems((prev) => {
            const existing = prev.find((item) => item.id === id)

            if (existing) {
                return prev.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    function remove(id: string) {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    function increase(id: string) {
        setItems((prev) => prev.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ))
    }

    function decrease(id: string) {
        setItems(prev =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    function clear() {
        setItems([])
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal / 10 >= 12 ? 0 : subtotal / 10
    const total = subtotal + shipping

    const amount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, add, remove, increase, decrease, clear, subtotal, shipping, total, amount }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)!