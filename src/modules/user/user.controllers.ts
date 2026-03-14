import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";

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

export const userControllers = { getUserById, updateProfile };
