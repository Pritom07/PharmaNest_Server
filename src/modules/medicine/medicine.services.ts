import { prisma } from "../../lib/prisma";
import { T_medicine } from "../../types/medicine.type";

const addMedicine = async (payLoad: T_medicine) => {
  const res = await prisma.medicines.create({
    data: payLoad,
  });
  return res;
};

export const medicineServices = { addMedicine };
