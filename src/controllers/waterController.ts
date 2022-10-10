import { Request, Response } from "express";
import { addWater, findWaterQuantity } from "../services/waterService";

async function addWaterController(req: Request, res: Response) {
  const userId = res.locals.userId;
  const newWater = {
    ...req.body,
    userId,
  };
  await addWater(newWater);
  res.sendStatus(201);
}

async function findWaterController(req: Request, res: Response) {
  const { day: createdAt } = req.params;
  const userId = res.locals.userId;

  const waterQuantity = await findWaterQuantity(createdAt, userId);
  res.status(200).send(waterQuantity);
}
export { addWaterController, findWaterController };
