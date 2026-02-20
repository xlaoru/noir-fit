"use server"

import { redirect } from "next/navigation"
import { register } from "../services/auth.service"

export async function registerEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  await register(email, password, firstName, lastName)

  redirect("/")
}
