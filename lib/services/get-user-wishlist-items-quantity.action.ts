import prisma from "../prisma"

export async function getUserWishlistItemsQuantity(userId: string) {
  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId,
    },
  })

  return { quantity: wishlist.length }
}
