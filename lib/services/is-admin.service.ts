import prisma from "../prisma"

export async function isAdmin(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user.role === "ADMIN"
}