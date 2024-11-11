-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "sales_representative_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");
