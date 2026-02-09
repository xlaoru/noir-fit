import { logOut } from "@/lib/actions/log-out.action"
import { requireUser } from "@/lib/services/require-user.service"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await requireUser()

    if (!user) {
        redirect("/api/auth/refresh")
    }

    return (
        <>
            <h2>{user.email}</h2>
            <form action={logOut}>
                <button
                    type="submit"
                    className="bg-zinc-100 text-zinc-950 px-5 py-3 font-bold rounded-sm cursor-pointer hover:bg-zinc-300">Log Out</button>
            </form>
            {children}
        </>
    )
}
