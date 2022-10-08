import { Request, Response } from "express";
import { createDiaryService, getDayDiaries } from "../services/diaryService";
import { CreateDiaryType } from "../types/diaryTypes";

async function createDiaryController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newDiary: CreateDiaryType = {
    ...req.body,
    userId,
  };
  await createDiaryService(newDiary);

  res.sendStatus(201);
}

async function getDiaries(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const { day: createdAt } = req.params;

  const diaries = await getDayDiaries(createdAt, userId);
  res.status(200).send(diaries);
}
export { createDiaryController, getDiaries };
