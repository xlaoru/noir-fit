import { OrderStatus } from "@/app/generated/prisma"
import prisma from "../prisma"

export async function getUserOrders(userId: string, status?: OrderStatus | "all") {
  const where: { userId: string; status?: OrderStatus } = { userId };
  
  if (status && status.toUpperCase() !== "ALL") {
    where.status = status.toUpperCase() as OrderStatus;
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      items: true,
    },
  });

  return orders;
}
