import prisma from "../prisma"

export async function getSavedProducts(userId: string) {
  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId,
    },
    select: {
      product: {
        select: {
          id: true,
          images: true,
          title: true,
          price: true,
          category: true,
          gender: true,
          slug: true,
          type: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const products = wishlist.map((item) => ({
    ...item.product,
    gender: item.product.gender ?? undefined,
    isSaved: true,
  }))

  return { products }
}
