import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { medicineRotes } from "./modules/medicine/medicine.routes";
import { notFound } from "./middlewares/notFound";
import { publicRoutes } from "./modules/public/public.routes";

const app = express();
const allowedOrigins = [
  config.APP_URL,
  config.PROD_APP_URL,
  "http://localhost:3000",
  "http://localhost:5000",
].filter(Boolean);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/Blog_Application_client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", publicRoutes);

app.use("/api/seller", medicineRotes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Pharmanest Server!");
});

app.use(notFound);

export default app;
