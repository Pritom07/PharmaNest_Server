/*
  Warnings:

  - Made the column `updatedAt` on table `medicines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'PROCESSING';

-- AlterTable
ALTER TABLE "medicines" ALTER COLUMN "updatedAt" SET NOT NULL;
