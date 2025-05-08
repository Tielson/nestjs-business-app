/*
  Warnings:

  - You are about to drop the column `road` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "road",
ADD COLUMN     "street" TEXT;
