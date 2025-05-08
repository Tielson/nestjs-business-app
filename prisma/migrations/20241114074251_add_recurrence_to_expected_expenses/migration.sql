/*
  Warnings:

  - Added the required column `recurrence` to the `expected_expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expected_expenses" ADD COLUMN     "recurrence" TEXT NOT NULL;
