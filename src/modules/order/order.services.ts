import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";
import { T_medicineOrder } from "../../types/order.type";

const createOrder = async (payLoad: T_medicineOrder) => {
  const res = await prisma.$transaction(async (tx) => {
    for (const item of payLoad.medicines) {
      const isExist = await tx.medicines.findUnique({
        where: {
          id: item.id,
        },
        select: {
          stock: true,
        },
      });

      if (!isExist) {
        throw new Error("Medicine Not Found");
      }

      if (isExist.stock < item.quantity!) {
        throw new Error(`Insufficient stock for medicine : ${item.name}`);
      }
    }

    const result = await tx.orders.create({
      data: {
        customer_id: payLoad.customer_id,
        subtotal_amount: payLoad.subtotal_amount,
        delivery_charge: payLoad.delivery_charge,
        total_amount: payLoad.total_amount,
        phoneNumber: payLoad.phoneNumber,
        address: payLoad.address,
        orderItems: {
          create: payLoad.medicines.map((medicine: T_medicine) => {
            return {
              medicine: {
                connect: { id: medicine.id! },
              },
              seller: {
                connect: { id: medicine.seller_id },
              },
              price: medicine.price,
              quantity: medicine.quantity!,
            };
          }),
        },
      },
      include: {
        orderItems: true,
      },
    });

    for (const item of payLoad.medicines) {
      await tx.medicines.update({
        where: {
          id: item.id,
        },
        data: {
          stock: {
            decrement: item.quantity!,
          },
        },
      });
    }

    return result;
  });

  return res;
};

const getAllOrders = async (customer_id: string) => {
  const isOrderExist = await prisma.orders.findFirst({
    where: {
      customer_id,
    },
  });

  if (!isOrderExist) {
    return [];
  }

  const res = await prisma.orders.findMany({
    where: {
      customer_id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
};

const deleteOrder = async (id: string) => {
  const res = await prisma.$transaction(async (tx) => {
    const isExist = await tx.orders.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new Error("Order Not Found");
    }

    const medicinesArray = await tx.orderItem.findMany({
      where: {
        order_id: id,
      },
      include: {
        medicine: {
          select: {
            name: true,
          },
        },
      },
    });

    for (const item of medicinesArray) {
      if (item.status !== "PLACED" && item.status !== "CANCELLED") {
        return `The order cannot be deleted because ${item.medicine.name} is already ${item.status}. Thanks you for being with us.`;
      }
    }

    const result = await tx.orders.delete({
      where: {
        id,
      },
    });

    for (const item of medicinesArray) {
      await tx.medicines.update({
        where: {
          id: item.medicine_id,
        },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    return result;
  });

  return res;
};

export const orderServices = { createOrder, getAllOrders, deleteOrder };
