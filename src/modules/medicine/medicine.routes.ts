import { Router } from "express";
import { auth, Role } from "../../middlewares/auth";
import { medicineControllers } from "./medicine.controllers";

const router = Router();

router.get(
  "/medicines",
  auth(Role.SELLER),
  medicineControllers.viewAllMedicines,
);

router.get(
  "/medicines/:id",
  auth(Role.SELLER),
  medicineControllers.getMedicineById,
);

router.post("/medicines", auth(Role.SELLER), medicineControllers.addMedicine);

router.patch(
  "/medicines/:id",
  auth(Role.SELLER),
  medicineControllers.updateMedicine,
);

router.delete(
  "/medicines/:id",
  auth(Role.SELLER),
  medicineControllers.deleteMedicine,
);

export const medicineRotes = router;
