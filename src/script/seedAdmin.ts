import config from "../config";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  const adminInfo = {
    name: config.ADMIN_NAME,
    email: config.ADMIN_EMAIL,
    password: config.ADMIN_PASS,
    role: config.ADMIN_ROLE,
  };

  const isExist = await prisma.user.findUnique({
    where: {
      email: adminInfo.email,
    },
  });

  if (isExist) {
    throw new Error("ADMIN_ALREADY_EXIST");
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminInfo),
    });
  } catch (err: any) {
    throw err;
  }
};

seedAdmin();
