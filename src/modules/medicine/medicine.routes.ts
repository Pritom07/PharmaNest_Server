import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { medicineControllers } from "./medicine.controllers";

const router = Router();

router.post("/medicines", auth(Role.SELLER), medicineControllers.addMedicine);

export const medicineRotes = router;
