import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const main = async () => {
  try {
    const PORT = config.PORT || 5000;
    await prisma.$connect();
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`app running on port : ${PORT}`);
    });
  } catch (err: any) {
    await prisma.$disconnect();
    console.log(err.message);
    process.exit(1);
  }
};

main();
