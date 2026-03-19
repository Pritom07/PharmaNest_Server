import { prisma } from "../../lib/prisma";
import { T_cancelOrderItem } from "../../types/cancelOrderItem.type";
import { T_orderItem } from "../../types/orderItem.type";

const getAllOrderItems = async (order_id: string) => {
  const isExist = await prisma.orderItem.findFirst({
    where: {
      order_id,
    },
  });

  if (!isExist) {
    throw new Error("Order Items Not Found");
  }

  const allOrders = await prisma.orderItem.findMany({
    where: {
      order_id,
    },
    include: {
      medicine: {
        select: {
          name: true,
        },
      },
    },
  });

  const paidOrders: T_orderItem[] = [];
  const deliveredOrders: T_orderItem[] = [];
  const cancelledOrders: T_orderItem[] = [];
  const generalOrders: T_orderItem[] = [];

  for (const item of allOrders) {
    if (item.status === "DELIVERED" && item.price_paying_status === true) {
      paidOrders.push(item as T_orderItem);
      continue;
    }

    if (item.status === "DELIVERED" && item.price_paying_status === false) {
      deliveredOrders.push(item as T_orderItem);
      continue;
    }

    if (item.status === "CANCELLED") {
      cancelledOrders.push(item as T_orderItem);
      continue;
    }

    generalOrders.push(item as T_orderItem);
  }

  return { paidOrders, deliveredOrders, cancelledOrders, generalOrders };
};

const cancelOrderItem = async (id: string, payLoad: T_cancelOrderItem) => {
  const res = await prisma.$transaction(async (tx) => {
    const isExist = await tx.orderItem.findUnique({
      where: {
        id,
        status: payLoad.status,
      },
      select: {
        medicine_id: true,
        order_id: true,
      },
    });

    if (!isExist) {
      return { data: "Medicine Not Found", status: 404 };
    }

    await tx.orderItem.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    await tx.orders.update({
      where: {
        id: isExist?.order_id,
      },
      data: {
        subtotal_amount: {
          decrement: Number(payLoad.price) * Number(payLoad.quantity),
        },
        total_amount: {
          decrement: Number(payLoad.price) * Number(payLoad.quantity),
        },
      },
    });

    await tx.medicines.update({
      where: {
        id: isExist.medicine_id,
      },
      data: {
        stock: {
          increment: payLoad.quantity,
        },
      },
    });

    return { data: "All is Ok", status: 200 };
  });

  return res;
};

const deliveredStatusChecking = async (order_id: string) => {
  const isExist = await prisma.orderItem.findFirst({
    where: {
      order_id,
      status: "DELIVERED",
    },
  });

  if (isExist) {
    return true;
  }

  return false;
};

export const orderItemServices = {
  getAllOrderItems,
  cancelOrderItem,
  deliveredStatusChecking,
};
