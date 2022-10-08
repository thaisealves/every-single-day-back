import { moodType } from "@prisma/client";

interface IMood {
  id: number;
  userId: number;
  mood: moodType;
  createdAt: string;
}

type MoodSchemaType  = Omit<IMood, "id" | "userId">;
type CreateMoodType  = Omit<IMood, "id">;
export { IMood, MoodSchemaType, CreateMoodType };
