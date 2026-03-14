import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";
import { T_medicineOrder } from "../../types/order.type";

const createOrder = async (payLoad: T_medicineOrder) => {
  const res = await prisma.orders.create({
    data: {
      customer_id: payLoad.customer_id,
      subtotal_amount: payLoad.subtotal_amount,
      delivery_charge: payLoad.delivery_charge,
      total_amount: payLoad.total_amount,
      phoneNumber: payLoad.phoneNumber,
      address: payLoad.address,
      orderItems: {
        create: payLoad.medicines.map((medicine: T_medicine) => ({
          medicine: {
            connect: { id: medicine.id! },
          },
          seller: {
            connect: { id: medicine.seller_id },
          },
          price: medicine.price,
          quantity: medicine.quantity!,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });
  return res;
};

export const orderServices = { createOrder };
