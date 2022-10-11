import { CreateFoodType, CreateNumberOfMealsType } from "../types/foodTypes";
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

async function addFood(food: CreateFoodType) {
  await prisma.food.create({ data: food });
}

async function findFoods(userId: number, createdAt: string) {
  const userFoods = await prisma.food.findMany({
    where: { userId, createdAt },
  });
  return userFoods;
}
export {
  addNumberOfMeals,
  findNumberOfMeals,
  updateNumberOfMeals,
  addFood,
  findFoods,
};
