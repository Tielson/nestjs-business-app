/*
  Warnings:

  - You are about to drop the column `cpf` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `active` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_cnpj` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_type` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `road` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trade_name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_cpf_key";

-- DropIndex
DROP INDEX "Customer_email_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "cpf",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "client" BOOLEAN NOT NULL,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "cpf_cnpj" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "person_type" TEXT NOT NULL,
ADD COLUMN     "recurring" BOOLEAN NOT NULL,
ADD COLUMN     "road" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "supplier" BOOLEAN NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ADD COLUMN     "trade_name" TEXT NOT NULL;
