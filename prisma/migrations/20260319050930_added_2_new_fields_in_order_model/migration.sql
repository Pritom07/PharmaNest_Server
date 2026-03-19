/*
  Warnings:

  - Added the required column `delivery_charge_taker_seller_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trnxID` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_charge_taker_seller_id" TEXT NOT NULL,
ADD COLUMN     "trnxID" TEXT NOT NULL;
