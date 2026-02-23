import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
  PORT: process.env.PORT,
  APP_URL: process.env.APP_URL,
  PROD_APP_URL: process.env.PROD_APP_URL,
};

export default config;
