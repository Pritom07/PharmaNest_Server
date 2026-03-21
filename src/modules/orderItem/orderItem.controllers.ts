import { NextFunction, Request, Response } from "express";
import { orderItemServices } from "./orderItem.services";
import { T_payOrderItem } from "../../types/payOrderItem";

const getAllOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order_id = req.params.id;
    const {
      paidOrders,
      deliveredOrders,
      cancelledOrders,
      generalOrders,
      status,
    } = await orderItemServices.getAllOrderItems(order_id as string);

    if (status === 200) {
      return res.status(200).json({
        success: true,
        message: "Getting All OrderItems Successfull",
        paidOrders: paidOrders,
        deliveredOrders: deliveredOrders,
        cancelledOrders: cancelledOrders,
        generalOrders: generalOrders,
      });
    }

    if (status === 404) {
      return res.status(404).json({
        success: false,
        message: "OrderItem Not Found",
      });
    }
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

const deliveredStatusChecking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order_id = req.params.id;
    const data = await orderItemServices.deliveredStatusChecking(
      order_id as string,
    );
    if (data === true) {
      return res.status(200).json({
        success: true,
        message: "Status DELIVERED Found",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Status DELIVERED Not Found",
    });
  } catch (err: any) {
    next(err);
  }
};

const payOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const payLoad = req.body;
    const { data, status } = await orderItemServices.payOrderItem(
      id as string,
      payLoad as T_payOrderItem,
    );

    if (status === 200) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Pay OrderItem Successfull",
        data: data,
      });
    }

    if (status === 403) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Delivery Charge Not Paid Yet !",
        data: data,
      });
    }

    return res.status(404).json({
      success: false,
      status: 404,
      message: "Medicine Not Found !",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCountData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const seller_id = req.user?.id;
    const data = await orderItemServices.getCountData(seller_id as string);
    return res.status(200).json({
      success: true,
      message: "Getting CountData Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const orderItemControllers = {
  getAllOrderItems,
  cancelOrderItem,
  deliveredStatusChecking,
  payOrderItem,
  getCountData,
};
