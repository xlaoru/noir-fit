import { Category, Gender } from "@/app/generated/prisma"
import prisma from "../prisma"
import { IFullProduct, IProduct } from "@/utils/models"

export async function getAllApparel(
  userId: string,
  gender: string,
  category?: string,
  sort?: string,
) {
  const rawApparel = (await prisma.product.findMany({
    where: {
      type: "APPAREL",
      gender: gender.toUpperCase() as Gender,
      ...(category ? { category: category.toUpperCase() as Category } : {}),
    },
    orderBy:
      sort === "newest"
        ? { createdAt: "desc" }
        : sort === "price_asc"
          ? { price: "asc" }
          : { price: "desc" },
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
  })) as IProduct[]

  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId,
    },
    select: {
      productId: true,
    },
  })

  const wishlistSet = new Set(wishlist.map((item) => item.productId))

  const apparel = rawApparel.map((product) => ({
    ...product,
    isSaved: wishlistSet.has(product.id),
  }))

  const rawCategories = await prisma.product.findMany({
    where: {
      type: "APPAREL",
    },
    select: {
      category: true,
    },
    distinct: ["category"],
  })

  const categories = rawCategories.map((item) => item.category.toLowerCase())

  return { apparel, categories }
}

export async function getCurrentApparel(
  userId: string,
  gender: string,
  slug: string,
) {
  const rawApparel = (await prisma.product.findUnique({
    where: {
      slug,
    },
  })) as IFullProduct

  const wishlist = await prisma.wishlist.findMany({
    where: {
      userId,
    },
    select: {
      productId: true,
    },
  })

  const wishlistSet = new Set(wishlist.map((item) => item.productId))

  const apparel = {
    isSaved: wishlistSet.has(rawApparel.id),
    ...rawApparel,
  }

  const rawRecommended = (await prisma.product.findMany({
    where: {
      id: {
        not: apparel?.id,
      },
      category: apparel?.category as Category,
      gender: gender.toUpperCase() as Gender,
    },
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
    take: 4,
  })) as IProduct[]

  const recommended = rawRecommended.map((product) => ({
    ...product,
    isSaved: wishlistSet.has(product.id),
  }))

  return { apparel, recommended }
}
