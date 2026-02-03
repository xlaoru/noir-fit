"use client"

import { Ban } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <section className="flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-xl rounded-3xl bg-zinc-900 border border-zinc-800 p-10 flex flex-col gap-8 text-center shadow-2xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 text-red-400">
                    <Ban />
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-3xl font-bold text-zinc-100">
                        Something went wrong
                    </h3>
                    <p className="text-zinc-400">
                        {error.message || "We couldn't load this content. Please try again."}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => reset()}
                        className="cursor-pointer px-6 py-3 rounded-xl bg-zinc-100 text-zinc-900 font-semibold hover:bg-zinc-300 transition-colors"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        Go to home
                    </Link>
                </div>
            </div>
        </section>
    )
}
