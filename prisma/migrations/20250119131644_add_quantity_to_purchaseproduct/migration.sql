/*
  Warnings:

  - Added the required column `quantity` to the `PurchaseProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseProduct" ADD COLUMN     "quantity" INTEGER NOT NULL;
