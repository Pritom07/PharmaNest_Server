import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { orderControllers } from "./order.controllers";

const router = Router();

router.get("/orders", auth(Role.CUSTOMER), orderControllers.getAllOrders);

router.get(
  "/orders/recent",
  auth(Role.SELLER),
  orderControllers.getRecentOrders,
);

router.get(
  "/orders/sellerEnd",
  auth(Role.SELLER),
  orderControllers.sellerEndAllOrders,
);

router.get(
  "/amountData/:id",
  auth(Role.CUSTOMER),
  orderControllers.getAmountData,
);

router.post("/order", auth(Role.CUSTOMER), orderControllers.createOrder);

router.patch(
  "/payDelivery/:id",
  auth(Role.CUSTOMER),
  orderControllers.payDeliveryCharge,
);

router.delete("/:id", auth(Role.CUSTOMER), orderControllers.deleteOrder);

export const orderRoutes = router;
