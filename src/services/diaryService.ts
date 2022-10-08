import { findDiary, postDiary } from "../repositories/diaryRepository";
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

export {createDiaryService}