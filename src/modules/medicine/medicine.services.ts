import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";
import { T_viewMedicineParams } from "../../types/viewMedicinesQueryParams";

const addMedicine = async (payLoad: T_medicine) => {
  const res = await prisma.medicines.create({
    data: payLoad,
  });
  return res;
};

const viewAllMedicines = async (paginationData: T_viewMedicineParams) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationData;
  const res = await prisma.$transaction(async (tx) => {
    const medicineData = await tx.medicines.findMany({
      take: limit,
      skip,

      orderBy: {
        [sortBy!]: sortOrder,
      },

      include: {
        medicine_Category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalEntry = await tx.medicines.count();
    const totalPages = Math.ceil(totalEntry / (limit ?? 7));

    const metadata = {
      totalMedicines: totalEntry,
      currentPage: page,
      totalPages: totalPages,
      size: limit,
    };
    return { medicineData, metadata };
  });
  return res;
};

export const medicineServices = { addMedicine, viewAllMedicines };
