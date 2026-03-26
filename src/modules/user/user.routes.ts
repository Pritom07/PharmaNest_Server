import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { userControllers } from "./user.controllers";

const router = Router();

router.get("/", auth(Role.ADMIN), userControllers.getAllUsers);

router.get(
  "/getUserStatus",
  auth(Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  userControllers.getUserStatus,
);

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

router.patch("/:id", auth(Role.ADMIN), userControllers.updateUserStatus);

export const userRoutes = router;
