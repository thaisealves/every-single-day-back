import { CreateVisionType } from "../types/visionTypes";
import { prisma } from "../utils/database";

async function addNewPicture(newPic: CreateVisionType) {
  await prisma.visions.create({
    data: newPic,
  });
}

async function getPictures(userId: number) {
  const pictures = await prisma.visions.findMany({ where: { userId } });
  return pictures;
}

export { addNewPicture, getPictures };
