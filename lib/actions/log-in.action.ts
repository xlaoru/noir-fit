"use server"

import { redirect } from "next/navigation"
import { login } from "../services/auth.service"

export async function logInEmail(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const user = await login(email, password)

  if (!user) {
    throw new Error("Invalid credentials.")
  }

  redirect("/account")
}
