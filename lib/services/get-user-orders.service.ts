import prisma from "../prisma"

export async function getUserOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  })

  return orders
}
