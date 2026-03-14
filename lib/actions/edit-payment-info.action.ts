"use server"

import { redirect } from "next/navigation"
import prisma from "../prisma"
import { requireUser } from "../services/require-user.service"
import { revalidatePath } from "next/cache"

export async function editPaymentInfo(formData: FormData) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const cardNumber = formData.get("cardNumber") as string
  const expireDate = formData.get("expireDate") as string
  const cvv = formData.get("cvv") as string
  const nameOfCard = formData.get("nameOfCard") as string

  if (!cardNumber || !expireDate || !cvv || !nameOfCard) {
    throw new Error("Missing fields")
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      cardNumber,
      expireDate,
      cvv,
      nameOfCard,
    },
  })

  revalidatePath(`/account/${user.slug}`)
}
