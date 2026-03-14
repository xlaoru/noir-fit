"use server"

import { redirect } from "next/navigation"
import { requireUser } from "../services/require-user.service"
import prisma from "../prisma"
import { revalidatePath } from "next/cache"

export async function editUserFullNameAndEmail(formData: FormData) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string

  if (!firstName || !lastName || !email) {
    throw new Error("Missing fields")
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      lastName,
      email,
    },
  })

  revalidatePath(`/account/${user.slug}`)
}
