/*
  Warnings:

  - The `createdAt` column on the `mood` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `numberOfMeals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `userWeight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdAt` column on the `water` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "mood" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "numberOfMeals" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "userWeight" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "water" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "mood_userId_createdAt_key" ON "mood"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "numberOfMeals_userId_createdAt_key" ON "numberOfMeals"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "userWeight_userId_createdAt_key" ON "userWeight"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "water_userId_createdAt_key" ON "water"("userId", "createdAt");
