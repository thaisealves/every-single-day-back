import {
  findDiariesFromDay,
  findDiary,
  postDiary,
} from "../repositories/diaryRepository";
import { CreateDiaryType } from "../types/diaryTypes";

async function createDiaryService(newDiary: CreateDiaryType) {
  const existingDiary = await findDiary(
    newDiary.userId,
    newDiary.createdAt,
    newDiary.type
  );
  if (existingDiary) {
    throw {
      code: "Conflict",
      message: "This kind of text already exists on this day",
    };
  }
  await postDiary(newDiary);
}

async function getDayDiaries(createdAt: string, userId: number) {
  const diaries = await findDiariesFromDay(userId, createdAt);
  if (!diaries.length) {
    throw {
      code: "NotFound",
      message: "This user doesn't have texts this day",
    };
  }
  return diaries;
}

export { createDiaryService, getDayDiaries };
