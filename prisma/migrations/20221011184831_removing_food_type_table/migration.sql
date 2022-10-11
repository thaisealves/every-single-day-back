/*
  Warnings:

  - You are about to drop the column `typeId` on the `food` table. All the data in the column will be lost.
  - You are about to drop the `foodType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `food` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "food" DROP CONSTRAINT "food_typeId_fkey";

-- AlterTable
ALTER TABLE "food" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "foodType";
