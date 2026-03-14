import { T_medicine } from "./medicine.type";

export type T_medicineOrder = {
  customer_id: string;
  subtotal_amount: number;
  delivery_charge: number;
  total_amount: number;
  phoneNumber: string;
  address: string;
  medicines: T_medicine[];
};
