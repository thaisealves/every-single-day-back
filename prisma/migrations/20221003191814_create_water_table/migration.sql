-- CreateTable
CREATE TABLE "water" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "waterQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "water_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "water" ADD CONSTRAINT "water_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
