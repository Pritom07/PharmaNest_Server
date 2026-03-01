import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "ROUTE_NOT_FOUND",
    url: req.originalUrl,
    date: Date(),
  });
};
