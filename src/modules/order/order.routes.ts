import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { orderControllers } from "./order.controllers";

const router = Router();

router.get("/orders", auth(Role.CUSTOMER), orderControllers.getAllOrders);

router.post("/order", auth(Role.CUSTOMER), orderControllers.createOrder);

router.delete("/:id", auth(Role.CUSTOMER), orderControllers.deleteOrder);

export const orderRoutes = router;
