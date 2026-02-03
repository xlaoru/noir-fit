import { Category, Type } from "@/app/generated/prisma"
import prisma from "../seed"
import { IFullProduct, IProduct } from "@/utils/models"

export async function getAllProducts(
  type: string,
  category?: string,
  sort?: string,
) {
  const products = (await prisma.product.findMany({
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

export async function getCurrentProduct(slug: string) {
  const product = (await prisma.product.findUnique({
    where: {
      slug,
    },
  })) as IFullProduct

  const recommended = (await prisma.product.findMany({
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

  return { product, recommended }
}

export async function getRecentProducts() {
  const products = (await prisma.product.findMany({
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

  return { products }
}
