"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { destroySession } from "../services/session.service"

export async function logOut() {
  await destroySession()
  revalidatePath("/", "layout")
  redirect("/login")
}
