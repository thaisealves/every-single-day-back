import {
  addFood,
  addNumberOfMeals,
  findFoods,
  findNumberOfMeals,
  updateNumberOfMeals,
} from "../repositories/foodRepository";
import { CreateFoodType, CreateNumberOfMealsType } from "../types/foodTypes";

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

async function addingFood(food: CreateFoodType) {
  await addFood(food);
}
async function findUsersFood(userId: number, createdAt: string) {
  const foodsFound = await findFoods(userId, createdAt);
  if (!foodsFound.length) {
    throw {
      code: "NotFound",
      message: "There's no food for this user this day",
    };
  }
  return foodsFound;
}
export {
  findNumberOfMealsService,
  addNumberOfMealsService,
  addingFood,
  findUsersFood,
};
