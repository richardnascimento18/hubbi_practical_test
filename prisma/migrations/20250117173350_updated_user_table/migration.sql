/*
  Warnings:

  - You are about to drop the column `imageURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageURL",
DROP COLUMN "name";
