"use server"

import { redirect } from "next/navigation"
import { destroySession } from "../services/session.service"

export async function logOut() {
  await destroySession()
  redirect("/login")
}
