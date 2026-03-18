"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import { hashPassword, verifyPassword } from "../services/password.service"
import prisma from "../prisma"
import { revalidatePath } from "next/cache"

export async function updatePassword(formData: FormData) {
    const user = await requireUser()
    
    if (!user) {
        redirect("/login")
    }

    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Missing fields")
    }

    if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match")
    }

    const isValid = await verifyPassword(currentPassword, user.password)

    if (!isValid) {
        throw new Error("Current password is incorrect")
    }

    if (currentPassword === newPassword) {
        throw new Error("New password cannot be the same as the current password")
    }

    const newPasswordHash = await hashPassword(newPassword)

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: newPasswordHash,
        },
    })

    revalidatePath(`/account/${user.slug}`)
}