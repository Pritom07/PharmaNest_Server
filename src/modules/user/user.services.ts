import { prisma } from "../../lib/prisma";
import { T_user } from "../../types/user.type";

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

export const userServices = { updateProfile };
