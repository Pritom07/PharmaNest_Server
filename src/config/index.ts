import dotenv from "dotenv";
import path from "path";
import { Role } from "../middlewares/auth";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
  PORT: process.env.PORT,
  APP_URL: process.env.APP_URL,
  PROD_APP_URL: process.env.PROD_APP_URL,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASS: process.env.ADMIN_PASS,
  ADMIN_ROLE: Role.ADMIN,
};

export default config;
