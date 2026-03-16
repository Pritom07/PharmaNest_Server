import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { orderItemControllers } from "./orderItem.controllers";

const router = Router();

router.get(
  "/customer/:id",
  auth(Role.CUSTOMER),
  orderItemControllers.getAllOrderItems,
);

export const orderItemRoutes = router;
