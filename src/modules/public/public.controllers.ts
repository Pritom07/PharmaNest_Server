import { NextFunction, Request, Response } from "express";
import { publicServices } from "./public.services";
import { paginationHelper } from "../../helpers/paginationHelpers";

const getAllMedicines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );
    const category_id = Number(req.query.category_id);
    const { medicineData, metadata } = await publicServices.getAllMedicines({
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
      category_id,
    });
    return res.status(200).json({
      success: true,
      message: "Getting Medicines successfull",
      data: medicineData,
      metadata: metadata,
    });
  } catch (err: any) {
    next(err);
  }
};

const getMedicineById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = await publicServices.getMedicineById(id as string);
    return res.status(200).json({
      success: true,
      message: "Getting Medicine Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getMedicineByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req?.body?.medicineSearchField;
    const data = await publicServices.getMedicineByName(name as string);
    return res.status(200).json({
      success: true,
      message: "Getting Medicine Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const publicControllers = {
  getAllMedicines,
  getMedicineById,
  getMedicineByName,
};
