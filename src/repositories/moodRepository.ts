import { CreateMoodType } from "../types/moodTypes";
import { prisma } from "../utils/database";

async function addMoodRepository(newMood: CreateMoodType) {
  await prisma.mood.create({
    data: newMood,
  });
}

async function findMood(userId: number, createdAt: string) {
  const mood = await prisma.mood.findUnique({
    where: {
      userId_createdAt: {
        userId,
        createdAt,
      },
    },
  });
  return mood;
}

async function updateMood(mood: CreateMoodType) {
  await prisma.mood.update({
    where: {
      userId_createdAt: {
        userId: mood.userId,
        createdAt: mood.createdAt,
      },
    },
    data: {
      mood: mood.mood,
    },
  });
}


export { addMoodRepository, findMood, updateMood };
