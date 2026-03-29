import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let errMessage = err.message || "INTERNAL_SERVER_ERROR";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errMessage =
      "THE REQUEST WAS UNACCEPTABLE, OFTEN DUE TO MISSING A REQUIRED PARAMETER.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 404;
      errMessage =
        "AN OPERATION FAILED BECAUSE IT DEPENDS ON ONE OR MORE RECORDS THAT WERE REQUIRED BUT NOT FOUND";
    } else if (err.code === "P2002") {
      statusCode = 409;
      errMessage = "UNIQUE CONSTRAINT FAILED";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errMessage = "FOREIGN KEY CONSTRAINT FAILED";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errMessage = "AN AUTHENTICATION FAILURE AGAINST YOUR DATABASE SERVER";
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    errMessage = "INTERNAL_SERVER_ERROR";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 500;
      errMessage = "AN AUTHENTICATION FAILURE WITH YOUR DATABASE SERVER";
    } else if (err.errorCode === "P1001") {
      statusCode = 500;
      errMessage =
        "UNABLE TO REACH THE DATABASE SERVER AT THE SPECIFIED HOST AND PORT";
    }
  }

  res.status(statusCode);
  res.json({ success: false, message: errMessage });
}

export default errorHandler;
