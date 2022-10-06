/*
  Warnings:

  - A unique constraint covering the columns `[userId,createdAt,type]` on the table `diary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,createdAt]` on the table `mood` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,createdAt]` on the table `numberOfMeals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,createdAt]` on the table `userWeight` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,image]` on the table `visions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,createdAt]` on the table `water` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "mood" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "numberOfMeals" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "userWeight" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "water" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "diary_userId_createdAt_type_key" ON "diary"("userId", "createdAt", "type");

-- CreateIndex
CREATE UNIQUE INDEX "mood_userId_createdAt_key" ON "mood"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "numberOfMeals_userId_createdAt_key" ON "numberOfMeals"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "userWeight_userId_createdAt_key" ON "userWeight"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "visions_userId_image_key" ON "visions"("userId", "image");

-- CreateIndex
CREATE UNIQUE INDEX "water_userId_createdAt_key" ON "water"("userId", "createdAt");
