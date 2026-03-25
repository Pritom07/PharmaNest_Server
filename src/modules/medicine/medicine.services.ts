import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";
import { T_viewMedicineParams } from "../../types/viewMedicinesQueryParams";

const addMedicine = async (payLoad: T_medicine) => {
  const res = await prisma.medicines.create({
    data: payLoad,
  });
  return res;
};

const viewAllMedicines = async (
  seller_id: string,
  paginationData: T_viewMedicineParams,
) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationData;
  const res = await prisma.$transaction(async (tx) => {
    const medicineData = await tx.medicines.findMany({
      where: {
        seller_id,
      },

      take: limit,
      skip,

      orderBy: {
        [sortBy!]: sortOrder,
      },

      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalEntry = await tx.medicines.count();
    const totalPages = Math.ceil(totalEntry / (limit ?? 7));

    const metadata = {
      total: totalEntry,
      currentPage: page,
      totalPages: totalPages,
      size: limit,
    };
    return { medicineData, metadata };
  });
  return res;
};

const deleteMedicine = async (id: string) => {
  const isExist = await prisma.medicines.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Medicine Not Found To Delete");
  }

  const res = await prisma.medicines.delete({
    where: {
      id,
    },
  });
  return res;
};

const getMedicineById = async (id: string) => {
  const res = await prisma.medicines.findUnique({
    where: {
      id,
    },

    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!res) {
    throw new Error("Medicine Not Found");
  }
  return res;
};

const updateMedicine = async (id: string, payLoad: T_medicine) => {
  const isExist = await prisma.medicines.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Medicine Not Found");
  }

  const res = await prisma.medicines.update({
    where: {
      id,
    },
    data: payLoad,
  });
  return res;
};

const getCountdata = async (seller_id: string) => {
  const [added_Medicines, low_Stock] = await Promise.all([
    await prisma.medicines.count({
      where: {
        seller_id,
      },
    }),

    await prisma.medicines.count({
      where: {
        seller_id,
        stock: {
          lt: 10,
        },
      },
    }),
  ]);

  return { added_Medicines, low_Stock };
};

export const medicineServices = {
  addMedicine,
  viewAllMedicines,
  deleteMedicine,
  getMedicineById,
  updateMedicine,
  getCountdata,
};
