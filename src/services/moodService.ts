import {
  addMoodRepository,
  findMood,
  updateMood,
} from "../repositories/moodRepository";
import { CreateMoodType } from "../types/moodTypes";

async function addMoodService(mood: CreateMoodType) {
  const existingMood = await findMood(mood.userId, mood.createdAt);

  if (existingMood) {
    await updateMood(mood);
  } else {
    await addMoodRepository(mood);
  }
}

async function findMoodService(userId: number, createdAt: string) {
  const existingMood = await findMood(userId, createdAt);

  return existingMood;
}

export { addMoodService, findMoodService };
