/*
  Warnings:

  - You are about to drop the `SalesRepresentative` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SalesRepresentative" DROP CONSTRAINT "SalesRepresentative_user_id_fkey";

-- DropTable
DROP TABLE "SalesRepresentative";

-- CreateTable
CREATE TABLE "sales_representative" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sales_representative_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales_representative" ADD CONSTRAINT "sales_representative_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
