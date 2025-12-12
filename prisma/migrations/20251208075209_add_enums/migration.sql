/*
  Warnings:

  - The `condition` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Beds', 'Tables', 'Chairs', 'Textiles', 'Storage');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('Perfect', 'Good', 'Bad');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
ALTER COLUMN "price" SET DEFAULT 50,
DROP COLUMN "condition",
ADD COLUMN     "condition" "Condition" NOT NULL DEFAULT 'Good',
ALTER COLUMN "location" SET DEFAULT 'Vilnius';
