import { Request, Response } from "express";
import { createDiaryService } from "../services/diaryService";
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
export { createDiaryController };
