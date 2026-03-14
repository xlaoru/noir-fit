"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import prisma from "../prisma"

export async function checkoutUser(formData: FormData) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const incoming = {
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    zipCode: formData.get("zipCode") as string,
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

  redirect("/payment")
}
