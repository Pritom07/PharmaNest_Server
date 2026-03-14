import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.services";
import { T_medicineOrder } from "../../types/order.type";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await orderServices.createOrder(req.body as T_medicineOrder);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const orderControllers = { createOrder };
