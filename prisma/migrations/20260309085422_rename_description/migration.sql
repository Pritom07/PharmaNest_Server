/*
  Warnings:

  - Made the column `Description` on table `medicines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "medicines" ALTER COLUMN "Description" SET NOT NULL;
