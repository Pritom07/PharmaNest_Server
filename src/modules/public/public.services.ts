import { prisma } from "../../lib/prisma";
import { T_viewMedicineParams } from "../../types/viewMedicinesQueryParams";

const getAllMedicines = async (paginationData: T_viewMedicineParams) => {
  const { page, limit, skip, sortBy, sortOrder, category_id } = paginationData;
  const medicineData = await prisma.medicines.findMany({
    take: limit,
    skip,
    orderBy: {
      [sortBy!]: sortOrder,
    },
    where: category_id ? { category_id } : {},
  });

  const totalEntry = await prisma.medicines.count({
    where: category_id ? { category_id } : {},
  });

  const totalPages = Math.ceil(totalEntry / (limit ?? 7));

  const metadata = {
    totalMedicines: totalEntry,
    currentPage: page,
    totalPages: totalPages,
    size: limit,
  };
  return { medicineData, metadata };
};

const getMedicineById = async (id: string) => {
  const res = await prisma.medicines.findUnique({
    where: {
      id,
    },
  });
  if (!res) {
    throw new Error("Medicine Not Found");
  }
  return res;
};

const getMedicineByName = async (name: string) => {
  const res = await prisma.medicines.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return res;
};

export const publicServices = {
  getAllMedicines,
  getMedicineById,
  getMedicineByName,
};
