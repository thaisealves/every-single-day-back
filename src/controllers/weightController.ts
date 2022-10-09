import { Request, Response } from "express";
import {
  findWeightService,
  postWeightService,
} from "../services/weightService";

async function postWeightController(req: Request, res: Response) {
  const userId = res.locals.userId;
  const newWeight = {
    ...req.body,
    userId,
  };
  await postWeightService(newWeight);
  res.sendStatus(201);
}

async function findWeightController(req: Request, res: Response) {
  const userId = res.locals.userId;

  const weight = await findWeightService(userId);

  res.status(200).send(weight);
}

export { postWeightController, findWeightController };
