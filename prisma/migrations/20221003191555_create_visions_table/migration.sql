-- CreateTable
CREATE TABLE "visions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "visions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
