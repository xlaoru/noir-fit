"use client"

import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"

export default function Header() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    const { amount: cartAmount } = useCart()

    const { amount: wishlistAmount } = useWishlist()

    const closeMenu = () => setOpen(false)

    return (
        <header className="z-1000 fixed top-0 left-0 w-full bg-zinc-950 border-b border-zinc-900">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-zinc-100 font-semibold tracking-wide"
                >
                    <Image
                        src="/logo.png"
                        alt="Noir Fit logo"
                        width={24}
                        height={24}
                        priority
                    />
                    <h4><span className="font-bold">Noir</span> Fit</h4>
                </Link>
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {[
                        { name: "Men", href: "/categories/collections/men" },
                        { name: "Women", href: "/categories/collections/women" },
                        { name: "Accessories", href: "/categories/accessories" },
                        { name: "Nutrition", href: "/categories/nutrition" },
                    ].map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    <Link
                        href="/wishlist"
                        className="relative flex h-9 w-9 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        aria-label="Wishlist"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                        </svg>
                        <div className={`${wishlistAmount === 0 ? "hidden" : "flex"} absolute top-0 right-0 min-w-[15px] h-[15px] px-[2.5px] flex items-center justify-center rounded-full bg-zinc-100 text-zinc-950 text-[11px] font-semibold leading-none shadow-md`}>{wishlistAmount > 99 ? 99 : wishlistAmount}</div>
                    </Link>
                    <Link
                        href="/cart"
                        className="relative flex h-9 w-9 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        aria-label="Cart"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                        </svg>
                        <div className={`${cartAmount === 0 ? "hidden" : "flex"} absolute top-0 -right-1 min-w-[15px] h-[15px] px-[2.5px] flex items-center justify-center rounded-full bg-zinc-100 text-zinc-950 text-[11px] font-semibold leading-none shadow-md`}>{cartAmount > 99 ? 99 : cartAmount}</div>
                    </Link>
                    <Link
                        href="/account"
                        className="flex h-9 w-9 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        aria-label="Account"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </Link>
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        className="md:hidden relative w-6 h-6 group cursor-pointer"
                        aria-label="Open menu"
                    >
                        <span className={`absolute left-0 top-1/2 h-[1.5px] w-4 bg-zinc-400 group-hover:bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
                        <span className={`absolute left-0 top-1/2 h-[1.5px] w-4 bg-zinc-400 group-hover:bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`absolute left-0 top-1/2 h-[1.5px] w-4 bg-zinc-400 group-hover:bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
                    </button>
                </div>
            </nav>
            {open && (
                <div ref={menuRef} className="md:hidden absolute top-16 left-0 w-full bg-zinc-950 border border-zinc-900">
                    <div className="flex flex-col gap-6 p-6 text-zinc-100">
                        <Link href="/categories/collections/men" onClick={closeMenu}>Men</Link>
                        <Link href="/categories/collections/women" onClick={closeMenu}>Women</Link>
                        <Link href="/categories/accessories" onClick={closeMenu}>Accessories</Link>
                        <Link href="/categories/nutrition" onClick={closeMenu}>Nutrition</Link>
                    </div>
                </div>
            )}
        </header>
    )
}
