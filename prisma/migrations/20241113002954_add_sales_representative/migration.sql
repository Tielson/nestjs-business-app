/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `sales_representative` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sales_representative_user_id_key" ON "sales_representative"("user_id");
