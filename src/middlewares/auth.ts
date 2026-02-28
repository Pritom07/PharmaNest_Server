import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string | null | undefined;
        status: string | null | undefined;
      };
    }
  }
}

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

export const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized_Access" });
      }

      req.user = {
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
        role: session?.user?.role,
        status: session?.user?.status,
      };

      if (roles.length && roles.includes(req.user.role as Role)) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: "Forbidden ! You_Don't_Have_Permission_To_Access_The_Resource",
      });
    } catch (err) {
      next(err);
    }
  };
};
