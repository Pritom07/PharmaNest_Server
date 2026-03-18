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

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const customer_id = req.user?.id;
    const data = await orderServices.getAllOrders(customer_id as string);
    return res.status(200).json({
      success: true,
      message: "Getting All Orders Successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data: any = await orderServices.deleteOrder(id as string);
    if (data.length > 0) {
      return res.status(500).json({
        success: false,
        message: "Order Delete Failed",
        data: data,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Order Delete Successfull",
        data: data,
      });
    }
  } catch (err: any) {
    next(err);
  }
};

const getAmountData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = await orderServices.getAmountData(id as string);
    return res.status(200).json({
      success: true,
      message: "Getting Amount Data Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
  deleteOrder,
  getAmountData,
};
