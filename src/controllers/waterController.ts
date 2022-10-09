import { Request, Response } from "express";
import { addWater } from "../services/waterService";

async function addWaterController(req: Request, res: Response) {
  const userId = res.locals.userId;
  const newWater = {
    ...req.body,
    userId,
  };
  await addWater(newWater);
  res.sendStatus(201);
}

export { addWaterController };
