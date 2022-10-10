import { CreateWeightType } from "../types/weightTypes";
import { prisma } from "../utils/database";

async function findWeight(createdAt: string, userId: number) {
  const weight = await prisma.userWeight.findUnique({
    where: {
      userId_createdAt: {
        userId,
        createdAt,
      },
    },
  });
  return weight;
}
async function findLastWeigth(userId: number) {
  const weight = await prisma.userWeight.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  return weight;
}
async function postWeight(newWeight: CreateWeightType) {
  await prisma.userWeight.create({
    data: newWeight,
  });
}

async function updateWeight(newWeight: CreateWeightType) {
  await prisma.userWeight.update({
    where: {
      userId_createdAt: {
        userId: newWeight.userId,
        createdAt: newWeight.createdAt,
      },
    },
    data: { weight: newWeight.weight },
  });
}
export { findWeight, postWeight, updateWeight, findLastWeigth };
