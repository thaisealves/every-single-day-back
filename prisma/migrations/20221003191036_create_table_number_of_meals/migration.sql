-- CreateTable
CREATE TABLE "NumberOfMeals" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NumberOfMeals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NumberOfMeals" ADD CONSTRAINT "NumberOfMeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
