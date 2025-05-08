/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg_state` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "cpf_cnpj",
DROP COLUMN "instagram",
ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "rg" TEXT NOT NULL,
ADD COLUMN     "rg_state" TEXT NOT NULL;
