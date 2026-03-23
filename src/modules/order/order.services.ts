import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";
import { T_medicineOrder } from "../../types/order.type";
import crypto from "crypto";
import { T_payDeliveryCharge } from "../../types/payDeliveryCharge.type";

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

    const transection_id = crypto.randomBytes(4).toString("hex");

    const result = await tx.orders.create({
      data: {
        customer_id: payLoad.customer_id,
        subtotal_amount: payLoad.subtotal_amount,
        delivery_charge: payLoad.delivery_charge,
        total_amount: payLoad.total_amount,
        phoneNumber: payLoad.phoneNumber,
        address: payLoad.address,
        trnxID: transection_id,
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

  const result = [];

  for (const item of res) {
    const orderItemsArray = await prisma.orderItem.findMany({
      where: {
        order_id: item.id,
      },
    });

    const is_All_OrderItem_Delivered_and_Paid =
      orderItemsArray.length &&
      orderItemsArray.some(
        (i) => i.status === "DELIVERED" && i.price_paying_status === true,
      );

    result.push({ ...item, is_All_OrderItem_Delivered_and_Paid });
  }

  return result;
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

const getAmountData = async (id: string) => {
  const res = await prisma.orders.findUnique({
    where: {
      id,
    },
    select: {
      subtotal_amount: true,
      delivery_charge: true,
      total_amount: true,
      total_paid_amount: true,
      delivery_charge_status: true,
    },
  });
  return res;
};

const payDeliveryCharge = async (id: string, payLoad: T_payDeliveryCharge) => {
  const res = await prisma.$transaction(async (tx) => {
    const isTransectionExist = await tx.orders.findUnique({
      where: {
        id,
        trnxID: payLoad.trnxID,
      },
      select: {
        delivery_charge: true,
      },
    });

    if (!isTransectionExist) {
      return { data: null, status: 403 };
    }

    const isSellerExist = await tx.orderItem.findFirst({
      where: {
        order_id: id,
        seller_id: payLoad.delivery_charge_taker_seller_id,
      },
    });

    if (!isSellerExist) {
      return { data: null, status: 403 };
    }

    const result = await tx.orders.update({
      where: {
        id,
      },
      data: {
        delivery_charge_status: true,
        total_paid_amount: {
          increment: isTransectionExist.delivery_charge,
        },
        delivery_charge_taker_seller_id:
          payLoad.delivery_charge_taker_seller_id,
      },
    });

    return { data: result, status: 200 };
  });

  return res;
};

const getRecentOrders = async () => {
  const res = (
    await prisma.orders.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    })
  ).slice(0, 5);
  return res;
};

const sellerEndAllOrders = async (seller_id: string) => {
  const res = await prisma.orders.findMany({
    where: {
      orderItems: {
        some: {
          seller_id,
          status: {
            not: "CANCELLED",
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
};

const getOrderById = async (id: string, seller_id: string) => {
  const res = await prisma.orders.findUnique({
    where: {
      id,
    },
    select: {
      phoneNumber: true,
      address: true,
      trnxID: true,
      createdAt: true,
      customer: {
        select: {
          name: true,
        },
      },
    },
  });
  return { ...res, seller_id };
};

export const orderServices = {
  createOrder,
  getAllOrders,
  deleteOrder,
  getAmountData,
  payDeliveryCharge,
  getRecentOrders,
  sellerEndAllOrders,
  getOrderById,
};
