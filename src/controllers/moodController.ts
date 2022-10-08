import { Request, Response } from "express";
import { addMoodService, findMoodService } from "../services/moodService";
import { CreateMoodType, MoodSchemaType } from "../types/moodTypes";

async function addMoodController(req: Request, res: Response) {
  const mood: MoodSchemaType = req.body;
  const userId: number = res.locals.userId;
  const newMood: CreateMoodType = {
    ...mood,
    userId,
  };
  await addMoodService(newMood);
  res.sendStatus(201);
}

async function findMoodController(req: Request, res: Response) {
  const { createdAt } = req.body;
  const userId: number = res.locals.userId;
  const findMood = findMoodService(userId, createdAt);
  res.status(200).send(findMood);
}
export { addMoodController, findMoodController };
