import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { paginationHelper } from "../../helpers/paginationHelpers";

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await userServices.getUserById(id as string);
    return res.status(200).json({
      success: true,
      message: "Get User Successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data = await userServices.updateProfile(id as string, req.body);
    return res.status(200).json({
      success: true,
      message: "User Updation Successfull !",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const data = await userServices.getUserStatus(id as string);
    return res.status(200).json({
      success: true,
      message: "Getting Status Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );
    const { result, metaData } = await userServices.getAllUsers({
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    return res.status(200).json({
      success: true,
      message: "Getting All Users Done",
      data: result,
      metaData,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const payLoad = req.body;
    const { data, status } = await userServices.updateUserStatus(
      id as string,
      payLoad,
    );

    if (status === 200) {
      return res.status(200).json({
        success: true,
        message: "Updating User Status Successfull",
        data: data,
      });
    }

    return res.status(404).json({
      success: false,
      message: "User Not Found",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const userControllers = {
  getUserById,
  updateProfile,
  getUserStatus,
  getAllUsers,
  updateUserStatus,
};
