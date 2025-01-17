-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleProduct" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseProduct" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_purchaseId_key" ON "Sale"("purchaseId");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
