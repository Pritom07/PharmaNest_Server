import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { userControllers } from "./user.controllers";

const router = Router();

router.get(
  "/:id",
  auth(Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  userControllers.getUserById,
);

router.patch(
  "/update-profile",
  auth(Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  userControllers.updateProfile,
);

export const userRoutes = router;
