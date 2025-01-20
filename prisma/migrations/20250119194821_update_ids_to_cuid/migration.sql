/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchaseProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PurchaseProduct` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `PurchaseProduct` table. All the data in the column will be lost.
  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SaleProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SaleProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseProduct" DROP CONSTRAINT "PurchaseProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseProduct" DROP CONSTRAINT "PurchaseProduct_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_saleId_fkey";

-- DropIndex
DROP INDEX "Sale_purchaseId_key";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Purchase_id_seq";

-- AlterTable
ALTER TABLE "PurchaseProduct" DROP CONSTRAINT "PurchaseProduct_pkey",
DROP COLUMN "id",
DROP COLUMN "quantity",
ALTER COLUMN "purchaseId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("purchaseId", "productId");

-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "purchaseId" DROP NOT NULL,
ALTER COLUMN "purchaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sale_id_seq";

-- AlterTable
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_pkey",
DROP COLUMN "id",
ALTER COLUMN "saleId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("saleId", "productId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
