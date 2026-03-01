import { T_viewMedicineParams } from "../types/viewMedicinesQueryParams";

export const paginationHelper = (
  queryParams: T_viewMedicineParams,
): T_viewMedicineParams => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 7;
  const skip = (page - 1) * limit;
  const sortBy = queryParams.sortBy || "createdAt";
  const sortOrder = queryParams.sortOrder || "desc";

  return { page, limit, skip, sortBy, sortOrder };
};
