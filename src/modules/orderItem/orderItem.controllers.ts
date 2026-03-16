import { NextFunction, Request, Response } from "express";
import { orderItemServices } from "./orderItem.services";

const getAllOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order_id = req.params.id;
    const data = await orderItemServices.getAllOrderItems(order_id as string);
    res.status(200).json({
      success: true,
      message: "Getting All OrderItems Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const orderItemControllers = { getAllOrderItems };
