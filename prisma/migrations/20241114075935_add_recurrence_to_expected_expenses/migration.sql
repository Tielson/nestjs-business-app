/*
  Warnings:

  - Added the required column `date` to the `expected_expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `other_income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expected_expenses" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "other_income" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
