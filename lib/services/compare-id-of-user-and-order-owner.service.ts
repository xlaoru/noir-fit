import prisma from "../prisma"

export async function compareIdOfUserAndOrderOwner(
  userId: string,
  orderId: string,
) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: userId,
    },
  })

  if (!order) {
    throw new Error("Order not found or access denied")
  }

  return order
}
