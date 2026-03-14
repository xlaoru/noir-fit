import prisma from "../prisma"

export async function toggleWishlist(userId: string, productId: string) {
  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })

  if (existing) {
    await prisma.wishlist.delete({
      where: {
        id: existing.id,
      },
    })

    return false
  }

  await prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
  })

  return true
}
