import { diaryType } from "@prisma/client";
import { CreateDiaryType } from "../types/diaryTypes";
import { prisma } from "../utils/database";

async function postDiary(newDiary: CreateDiaryType) {
  await prisma.diary.create({
    data: newDiary,
  });
}

async function findDiary(userId: number, createdAt: string, type: diaryType) {
  const diary = await prisma.diary.findUnique({
    where: {
      userId_createdAt_type: {
        userId,
        createdAt,
        type,
      },
    },
  });
  return diary;
}

async function findDiariesFromDay(userId: number, createdAt: string) {
  const diaries = await prisma.diary.findMany({
    where: {
      userId,
      createdAt,
    },
  });
  return diaries;
}

export { findDiariesFromDay, findDiary, postDiary };
