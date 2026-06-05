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
            {children}
        </>
    )
}
