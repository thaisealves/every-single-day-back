import { CreateWaterType } from "../types/waterTypes";
import { prisma } from "../utils/database";

async function postWater(newWater: CreateWaterType) {
  await prisma.water.create({
    data: newWater,
  });
}

async function findWater(createdAt: string, userId: number) {
  const water = await prisma.water.findUnique({
    where: {
      userId_createdAt: {
        userId,
        createdAt,
      },
    },
  });
  return water;
}
async function updateWater(newWater: CreateWaterType) {
  await prisma.water.update({
    where: {
      userId_createdAt: {
        userId: newWater.userId,
        createdAt: newWater.createdAt,
      },
    },
    data: {
      waterQuantity: newWater.waterQuantity,
    },
  });
}

export { postWater, findWater, updateWater };
