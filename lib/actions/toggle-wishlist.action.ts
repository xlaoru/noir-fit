"use server"

import { requireUser } from "@/lib/services/require-user.service"
import { toggleWishlist } from "@/lib/services/wishlist.service"

export async function toggleWishlistAction(productId: string) {
  const user = await requireUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return toggleWishlist(user.id, productId)
}
