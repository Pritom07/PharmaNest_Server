import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { reviewControllers } from "./review.controllers";

const router = Router();

router.get("/", reviewControllers.getAllReviews);

router.put("/", auth(Role.CUSTOMER), reviewControllers.createReviewOrUpdate);

export const reviewRoutes = router;
