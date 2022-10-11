import { Request, Response } from "express";
import {
  addingFood,
  addNumberOfMealsService,
  findNumberOfMealsService,
  findUsersFood,
} from "../services/foodService";
import { CreateFoodType, CreateNumberOfMealsType } from "../types/foodTypes";

async function addNumberOfMealsController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const meal: CreateNumberOfMealsType = {
    ...req.body,
    userId,
  };
  await addNumberOfMealsService(meal);
  res.sendStatus(201);
}
async function findNumberOfMealsController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const { day: createdAt } = req.params;

  const existingNumber = await findNumberOfMealsService(userId, createdAt);
  res.status(200).send(existingNumber);
}

async function addFoodController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newFood: CreateFoodType = {
    userId,
    ...req.body,
  };
  await addingFood(newFood);
  res.sendStatus(201);
}

async function findFoodsController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const { day: createdAt } = req.params;
  const foods = await findUsersFood(userId, createdAt);
  res.status(200).send(foods);
}
export {
  addNumberOfMealsController,
  findNumberOfMealsController,
  addFoodController,
  findFoodsController,
};
