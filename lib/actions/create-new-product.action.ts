"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import { isAdmin } from "../services/is-admin.service"
import prisma from "../prisma"
import { adminStorage } from "../services/firbase-admin.service"
import { Category, Gender, Type } from "@/app/generated/prisma"

export async function createNewProduct(formData: FormData) {
    const user = await requireUser()
    
    if (!user) {
        redirect("/login")
    }
    
    const isAdminUser = await isAdmin(user.id)

    if (!isAdminUser) {
        redirect("/")
    }

    const file = formData.get("productImage") as File
    const name = formData.get("productName") as string
    const price = formData.get("productPrice") as string
    const category = formData.get("productCategory") as "Men" | "Women" | "Nutrition" | "Accessories"
    const subCategoryRaw = (formData.get("productSubCategory") as string).toUpperCase() as Category
    const description = formData.get("productDescription") as string
    const sizes = formData.get("productSizes") as string
    const colors = formData.get("productColors") as string
    const care = formData.get("productCare") as string
    const fit = formData.get("productFit") as string
    const origin = formData.get("productOrigin") as string
    const material = formData.get("productMaterial") as string

    if (!file || !name || !price || !category || !subCategoryRaw || !description || sizes.length === 0 || colors.length === 0 || !care || !fit || !origin || !material) {
        throw new Error("Missing fields")
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const filename = `${Date.now()}_${file.name}`
    const filePath = `noir-fit/products/${filename}`

    const bucket = adminStorage.bucket()
    const fileRef = bucket.file(filePath)

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
      public: true,
    })

    const [imageUrl] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    })

    const baseSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
    let slug = baseSlug
    let i = 1

    while (await prisma.product.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${i++}`
    }
    
    
    await prisma.product.create({
        data: {
            images: [imageUrl],
            title: name,
            price: parseFloat(price),
            category: subCategoryRaw,
            slug,
            description,
            sizes: sizes.split(", "),
            colors: colors.split(", "),
            care,
            fit,
            origin,
            material,
            ...(category === "Men" || category === "Women") ? { gender: category.toUpperCase() as Gender, type: "APPAREL" as Type } : { type: category.toUpperCase() as Type },
        }
    })
}