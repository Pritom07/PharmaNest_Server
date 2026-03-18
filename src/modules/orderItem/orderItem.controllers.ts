import { NextFunction, Request, Response } from "express";
import { orderItemServices } from "./orderItem.services";

const getAllOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order_id = req.params.id;
    const { paidOrders, deliveredOrders, cancelledOrders, generalOrders } =
      await orderItemServices.getAllOrderItems(order_id as string);
    res.status(200).json({
      success: true,
      message: "Getting All OrderItems Successfull",
      paidOrders: paidOrders,
      deliveredOrders: deliveredOrders,
      cancelledOrders: cancelledOrders,
      generalOrders: generalOrders,
    });
  } catch (err: any) {
    next(err);
  }
};

const cancelOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const payLoad = req.body;
    const { data, status } = await orderItemServices.cancelOrderItem(
      id as string,
      payLoad,
    );

    if (status === 200) {
      return res.status(200).json({
        success: true,
        message: "Cancel orderItem successfull",
        data: data,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Medicine Not Found",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const orderItemControllers = { getAllOrderItems, cancelOrderItem };
