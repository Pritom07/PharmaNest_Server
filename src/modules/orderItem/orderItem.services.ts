import { prisma } from "../../lib/prisma";

const getAllOrderItems = async (order_id: string) => {
  const isExist = await prisma.orderItem.findFirst({
    where: {
      order_id,
    },
  });

  if (!isExist) {
    throw new Error("Order Items Not Found");
  }

  const res = await prisma.orderItem.findMany({
    where: {
      order_id,
    },
  });

  return res;
};

export const orderItemServices = { getAllOrderItems };
