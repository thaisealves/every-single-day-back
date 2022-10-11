import { Request, Response } from "express";
import {
  addNumberOfMealsService,
  findNumberOfMealsService,
} from "../services/foodService";
import { CreateNumberOfMealsType } from "../types/foodTypes";

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

export { addNumberOfMealsController, findNumberOfMealsController };
