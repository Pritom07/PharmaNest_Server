import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";

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

export const userControllers = { updateProfile };
