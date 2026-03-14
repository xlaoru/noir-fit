"use client"

import { useCart } from "@/context/cart-context";
import { logInEmail } from "@/lib/actions/log-in.action";
import Link from "next/link";
import { useEffect } from "react";

export default function LogIn() {
    const { clear } = useCart()

    useEffect(() => {
        clear()
    }, [])

    return (
        <section className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-[420px]">
                <form
                    action={logInEmail}
                    className="flex flex-col gap-4 p-6 bg-zinc-950 border border-zinc-800 rounded-md"
                >
                    <h2 className="text-left">
                        Log In
                    </h2>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm text-zinc-400"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="example@mail.com"
                            className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm text-zinc-400"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="********"
                            className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer mt-2 h-11 bg-zinc-100 text-zinc-950 font-semibold rounded-sm
                           hover:bg-zinc-300 transition-colors"
                    >
                        Submit
                    </button>
                    <p className="text-sm text-zinc-400 text-center">
                        No account?{" "}
                        <Link
                            href="/signup"
                            className="text-zinc-100 hover:underline underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}
