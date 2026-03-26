import { prisma } from "../../lib/prisma";
import { T_user } from "../../types/user.type";
import { T_viewMedicineParams } from "../../types/viewMedicinesQueryParams";

const getUserById = async (id: string) => {
  const res = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!res) {
    throw new Error("User Not Found !");
  }

  return res;
};

const updateProfile = async (id: string, payLoad: T_user) => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("User Not Found !");
  }

  const res = await prisma.user.update({
    where: {
      id,
    },
    data: payLoad,
  });
  return res;
};

const getUserStatus = async (id: string) => {
  const res = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });

  return res;
};

const getAllUsers = async ({
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: T_viewMedicineParams) => {
  const result = await prisma.user.findMany({
    where: {
      role: {
        in: ["CUSTOMER", "SELLER"],
      },
    },

    take: limit,
    skip,

    orderBy: {
      [sortBy!]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: {
      role: {
        in: ["CUSTOMER", "SELLER"],
      },
    },
  });

  const totalPages = Math.ceil(total / (limit ?? 7));
  const metaData = {
    total,
    currentPage: page,
    totalPages,
    size: limit,
  };
  return { result, metaData };
};

const updateUserStatus = async (
  id: string,
  payLoad: { status: "ACTIVE" | "BANNED" },
) => {
  const isExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isExist) {
    return { data: "User Not Found", status: 404 };
  }

  const res = await prisma.user.update({
    where: { id },
    data: payLoad,
  });

  return { data: res, status: 200 };
};

export const userServices = {
  getUserById,
  updateProfile,
  getUserStatus,
  getAllUsers,
  updateUserStatus,
};
