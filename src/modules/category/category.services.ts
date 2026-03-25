import { prisma } from "../../lib/prisma";
import { T_category } from "../../types/category.type";
import { T_viewMedicineParams } from "../../types/viewMedicinesQueryParams";

const getAllCategories = async ({
  page,
  limit,
  skip,
}: T_viewMedicineParams) => {
  const res = await prisma.categories.findMany({
    take: limit,
    skip,
  });

  const result: any[] = [];
  for (const category of res) {
    const count = await prisma.medicines.count({
      where: {
        category_id: category.id,
      },
    });
    result.push({ ...category, count });
  }

  const total_categories = await prisma.categories.count();
  const total_pages = Math.ceil(total_categories / (limit ?? 7));
  const metaData = {
    total: total_categories,
    currentPage: page,
    totalPages: total_pages,
    size: limit,
  };

  return { result, metaData };
};

const createCategory = async (payLoad: T_category) => {
  const allCategory = await prisma.categories.findMany();
  const lastCategory = allCategory[allCategory.length - 1];

  const id = lastCategory.id + 1;
  const body = { ...payLoad, id };

  const res = await prisma.categories.create({
    data: body,
  });

  return res;
};

const deleteCategory = async (id: number) => {
  const isExist = await prisma.categories.findUnique({
    where: { id },
  });

  if (!isExist) {
    return { data: "Category Not Exist", status: 404 };
  }

  await prisma.categories.delete({
    where: { id },
  });

  return { data: "Category Delete Successfull", status: 200 };
};

const editCategory = async (
  id: number,
  payLoad: { name?: string; description?: string },
) => {
  const isExist = await prisma.categories.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    return { data: "Category Not Exist", status: 404 };
  }

  const res = await prisma.categories.update({
    where: {
      id,
    },
    data: payLoad,
  });

  return { data: res, status: 200 };
};

export const categoryServices = {
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
};
