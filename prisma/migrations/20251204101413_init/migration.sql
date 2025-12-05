-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('IN_STOCK', 'SOLD');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "condition" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availability" "Availability" NOT NULL DEFAULT 'IN_STOCK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
