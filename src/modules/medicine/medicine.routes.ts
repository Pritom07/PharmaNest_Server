import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { medicineControllers } from "./medicine.controllers";

const router = Router();

router.get(
  "/medicines",
  auth(Role.SELLER),
  medicineControllers.viewAllMedicines,
);

router.post("/medicines", auth(Role.SELLER), medicineControllers.addMedicine);

export const medicineRotes = router;
