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
  });

  return res;
};

export const orderServices = { createOrder, getAllOrders };
