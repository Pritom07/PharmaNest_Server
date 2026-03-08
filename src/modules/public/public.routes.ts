import { Router } from "express";
import { publicControllers } from "./public.controllers";

const router = Router();

router.get("/medicines", publicControllers.getAllMedicines);

router.get("/medicines/:id", publicControllers.getMedicineById);

router.post("/medicines", publicControllers.getMedicineByName);

export const publicRoutes = router;
