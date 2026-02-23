import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [config.APP_URL!, config.PROD_APP_URL!],
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Pharmanest Server!");
});

export default app;
