import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { categoryControllers } from "./category.controllers";

const router = Router();

router.get("/", auth(Role.ADMIN), categoryControllers.getAllCategories);

router.post("/", auth(Role.ADMIN), categoryControllers.createCategory);

router.patch("/update/:id", auth(Role.ADMIN), categoryControllers.editCategory);

router.delete("/:id", auth(Role.ADMIN), categoryControllers.deleteCategory);

export const categoryRoutes = router;
