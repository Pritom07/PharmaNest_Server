import { NextFunction, Request, Response } from "express";
import { reviewServices } from "./review.services";

const createReviewOrUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payLoad = req.body;
    const data = await reviewServices.createReviewOrUpdate(payLoad);
    return res.status(200).json({
      success: true,
      message: "Create or Update Review Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await reviewServices.getAllReviews();
    return res.status(200).json({
      success: true,
      message: "Getting All Reviews Done",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const reviewControllers = { createReviewOrUpdate, getAllReviews };
