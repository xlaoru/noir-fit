"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "../prisma"
import { adminStorage } from "../services/firbase-admin.service"
import { requireUser } from "../services/require-user.service"

export async function editUserProfileData(formData: FormData) {
  const user = await requireUser()

  if (!user) {
    redirect("/login")
  }

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const file = formData.get("avatar") as File

  if (!firstName || !lastName || !email || !file) {
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

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      lastName,
      email,
      avatar: imageUrl,
    },
  })

  revalidatePath(`/account/${user.slug}`)
}
