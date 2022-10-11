import { CreateNumberOfMealsType } from "../types/foodTypes";
import { prisma } from "../utils/database";

async function addNumberOfMeals(meal: CreateNumberOfMealsType) {
  await prisma.numberOfMeals.create({
    data: meal,
  });
}

async function findNumberOfMeals(userId: number, createdAt: string) {
  const existingNumber = await prisma.numberOfMeals.findUnique({
    where: {
      userId_createdAt: { userId, createdAt },
    },
  });
  return existingNumber;
}

async function updateNumberOfMeals(meal: CreateNumberOfMealsType) {
  await prisma.numberOfMeals.update({
    where: {
      userId_createdAt: { userId: meal.userId, createdAt: meal.createdAt },
    },
    data: { number: meal.number },
  });
}
export { addNumberOfMeals, findNumberOfMeals, updateNumberOfMeals };
