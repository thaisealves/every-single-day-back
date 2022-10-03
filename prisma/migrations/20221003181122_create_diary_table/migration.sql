-- CreateEnum
CREATE TYPE "diaryType" AS ENUM ('plans', 'diary');

-- CreateTable
CREATE TABLE "diary" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "diaryType" NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "diary_pkey" PRIMARY KEY ("id")
);
