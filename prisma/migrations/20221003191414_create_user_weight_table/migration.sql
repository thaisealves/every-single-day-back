/*
  Warnings:

  - You are about to drop the `Mood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NumberOfMeals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_userId_fkey";

-- DropForeignKey
ALTER TABLE "NumberOfMeals" DROP CONSTRAINT "NumberOfMeals_userId_fkey";

-- DropTable
DROP TABLE "Mood";

-- DropTable
DROP TABLE "NumberOfMeals";

-- CreateTable
CREATE TABLE "mood" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mood" "moodType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "numberOfMeals" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "numberOfMeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userWeight" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userWeight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mood" ADD CONSTRAINT "mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "numberOfMeals" ADD CONSTRAINT "numberOfMeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userWeight" ADD CONSTRAINT "userWeight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
