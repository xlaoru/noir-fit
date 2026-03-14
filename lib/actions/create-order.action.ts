"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import prisma from "../prisma"
import { ICartItem } from "@/utils/models"

export async function createOrder(
  items: ICartItem[],
  total: number,
  formData: FormData,
) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const incoming = {
    cardNumber: formData.get("cardNumber") as string,
    expireDate: formData.get("expireDate") as string,
    cvv: formData.get("cvv") as string,
    nameOfCard: formData.get("nameOfCard") as string,
  }

  for (const value of Object.values(incoming)) {
    if (!value) throw new Error("Missing fields")
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!currentUser) {
    throw new Error("User not found")
  }

  const updateData: Partial<typeof incoming> = {}

  for (const key of Object.keys(incoming) as (keyof typeof incoming)[]) {
    if (incoming[key] !== currentUser[key]) {
      updateData[key] = incoming[key]
    }
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    })
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address ?? "",
      city: user.city ?? "",
      country: user.country ?? "",
      zipCode: user.zipCode ?? "",
      items: {
        create: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          title: item.title,
          price: item.price,
          image: item.images[0],
        })),
      },
      status: "PAID",
    },
  })

  redirect(`/success?orderId=${order.id}`)
}
