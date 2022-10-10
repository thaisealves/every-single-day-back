import { prisma } from "../utils/database";
export async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE "water", "visions", "userWeight", "numberOfMeals", 
  "mood", "food", "foodType", "exercise", "exerciseType", "diary", "users"`;
}
