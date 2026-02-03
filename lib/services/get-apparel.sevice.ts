import { Category, Gender } from "@/app/generated/prisma"
import prisma from "../seed"
import { IFullProduct, IProduct } from "@/utils/models"

export async function getAllApparel(
  gender: string,
  category?: string,
  sort?: string,
) {
  const apparel = (await prisma.product.findMany({
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

export async function getCurrentApparel(gender: string, slug: string) {
  const apparel = (await prisma.product.findUnique({
    where: {
      slug,
    },
  })) as IFullProduct

  const recommended = (await prisma.product.findMany({
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

  return { apparel, recommended }
}
