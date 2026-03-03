import { NextFunction, Request, response, Response } from "express";
import { medicineServices } from "./medicine.services";
import { T_medicine } from "../../types/medicine.type";
import { Role } from "../../middlewares/auth";
import { paginationHelper } from "../../helpers/paginationHelpers";

const addMedicine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user?.role;

    if (userRole !== Role.SELLER) {
      return res.status(403).json({
        success: false,
        message: "Forbidden ! You_Don't_Have_Permission_To_Access_The_Resource",
      });
    }
    const data = await medicineServices.addMedicine(req.body as T_medicine);

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Adding_Medicine_Successfull",
        data: data,
      });
    }
  } catch (err) {
    next(err);
  }
};

const viewAllMedicines = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(
      req.query,
    );

    const { medicineData, metadata } = await medicineServices.viewAllMedicines({
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    return res.status(200).json({
      success: true,
      message: "Getting All Medicine Successfull",
      data: medicineData,
      metadata: metadata,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = await medicineServices.deleteMedicine(id as string);
    return res.status(200).json({
      success: true,
      message: "Medicine Delete successfull",
      data: data,
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
    const id = req.params.id as string;
    const data = await medicineServices.getMedicineById(id);
    return res.status(200).json({
      success: true,
      message: "Getting Medicine By id successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const payLoad: T_medicine = req.body;
    const data = await medicineServices.updateMedicine(id as string, payLoad);
    return res.status(200).json({
      success: true,
      message: "Medicine Updation Successfull",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const medicineControllers = {
  addMedicine,
  viewAllMedicines,
  deleteMedicine,
  getMedicineById,
  updateMedicine,
};
