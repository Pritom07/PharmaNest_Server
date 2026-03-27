import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./category.services";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { T_category } from "../../types/category.type";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, skip } = paginationHelper(req.query);
    const { result, metaData } = await categoryServices.getAllCategories({
      page,
      limit,
      skip,
    });

    return res.status(200).json({
      success: true,
      message: "Getting All Categories Successfull",
      data: result,
      metaData,
    });
  } catch (err: any) {
    next(err);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payLoad = req.body;
    const data = await categoryServices.createCategory(payLoad as T_category);
    return res.status(200).json({
      success: true,
      message: "Create Category Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const { data, status } = await categoryServices.deleteCategory(id);

    if (status === 200) {
      return res.status(200).json({
        success: true,
        message: "Category Delete Successfull",
        data: data,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Category Not Exist",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const payLoad = req.body;
    const { data, status } = await categoryServices.editCategory(id, payLoad);

    if (status === 200) {
      return res.status(200).json({
        success: true,
        message: "Category Updation Successfull",
        data: data,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Category Not Exist",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCategoryForSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await categoryServices.getCategoryForSeller();
    return res.status(200).json({
      success: true,
      message: "Getting Categories Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const categoryControllers = {
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
  getCategoryForSeller,
};
