/*
  Warnings:

  - You are about to drop the column `active` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `recurring` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `is_active` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_client` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_recurring` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_supplier` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "active",
DROP COLUMN "client",
DROP COLUMN "recurring",
DROP COLUMN "supplier",
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "is_client" BOOLEAN NOT NULL,
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL,
ADD COLUMN     "is_supplier" BOOLEAN NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
