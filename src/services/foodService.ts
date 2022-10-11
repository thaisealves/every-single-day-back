import {
  addNumberOfMeals,
  findNumberOfMeals,
  updateNumberOfMeals,
} from "../repositories/foodRepository";
import { CreateNumberOfMealsType } from "../types/foodTypes";

async function addNumberOfMealsService(meal: CreateNumberOfMealsType) {
  const existingNumber = await findNumberOfMeals(meal.userId, meal.createdAt);
  if (existingNumber) {
    await updateNumberOfMeals(meal);
  } else {
    await addNumberOfMeals(meal);
  }
}

async function findNumberOfMealsService(userId: number, createdAt: string) {
  const existingNumber = await findNumberOfMeals(userId, createdAt);
  if (!existingNumber) {
    throw { code: "NotFound", message: "No number of meals for user" };
  }
  return existingNumber;
}

export { findNumberOfMealsService, addNumberOfMealsService };
