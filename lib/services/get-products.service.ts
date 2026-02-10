import { Category, Type } from "@/app/generated/prisma"
import prisma from "../prisma"
import { IFullProduct, IProduct } from "@/utils/models"

export async function getAllProducts(
  userId: string,
  type: string,
  category?: string,
  sort?: string,
) {
  const rawProducts = (await prisma.product.findMany({
    where: {
      type: type.toUpperCase() as Type,
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

  const products = rawProducts.map((product) => ({
    ...product,
    isSaved: wishlistSet.has(product.id),
  }))

  const rawCategories = await prisma.product.findMany({
    where: {
      type: type.toUpperCase() as Type,
    },
    select: {
      category: true,
    },
    distinct: ["category"],
  })

  const categories = rawCategories.map((item) => item.category.toLowerCase())

  return { products, categories }
}

export async function getCurrentProduct(userId: string, slug: string) {
  const rawProduct = (await prisma.product.findUnique({
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

  const product = {
    isSaved: wishlistSet.has(rawProduct.id),
    ...rawProduct,
  }

  const rawRecommended = (await prisma.product.findMany({
    where: {
      id: {
        not: product?.id,
      },
      category: product?.category as Category,
    },
    select: {
      id: true,
      images: true,
      title: true,
      price: true,
      category: true,
      slug: true,
      type: true,
    },
    take: 4,
  })) as IProduct[]

  const recommended = rawRecommended.map((product) => ({
    ...product,
    isSaved: wishlistSet.has(product.id),
  }))

  return { product, recommended }
}

export async function getRecentProducts(userId: string) {
  const rawProducts = (await prisma.product.findMany({
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
    take: 8,
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

  const products = rawProducts.map((product) => ({
    ...product,
    isSaved: wishlistSet.has(product.id),
  }))

  return { products }
}
