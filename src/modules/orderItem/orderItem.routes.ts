import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { orderItemControllers } from "./orderItem.controllers";

const router = Router();

router.get(
  "/seller/getCountData",
  auth(Role.SELLER),
  orderItemControllers.getCountData,
);

router.get(
  "/customer/:id",
  auth(Role.CUSTOMER),
  orderItemControllers.getAllOrderItems,
);

router.get(
  "/deliveredChecking/:id",
  auth(Role.CUSTOMER),
  orderItemControllers.deliveredStatusChecking,
);

router.patch(
  "/customer/:id",
  auth(Role.CUSTOMER),
  orderItemControllers.cancelOrderItem,
);

router.patch(
  "/customer/payOrderItem/:id",
  auth(Role.CUSTOMER),
  orderItemControllers.payOrderItem,
);

export const orderItemRoutes = router;
