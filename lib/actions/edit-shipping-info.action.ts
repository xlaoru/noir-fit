"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import prisma from "../prisma"
import { revalidatePath } from "next/cache"

export async function editShippingInfo(formData: FormData) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const phoneNumber = formData.get("phoneNumber") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const country = formData.get("country") as string
  const zipCode = formData.get("zipCode") as string

  if (!phoneNumber || !address || !city || !country || !zipCode) {
    throw new Error("Missing fields")
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      phoneNumber,
      address,
      city,
      country,
      zipCode,
    },
  })

  revalidatePath(`/account/${user.slug}`)
}
