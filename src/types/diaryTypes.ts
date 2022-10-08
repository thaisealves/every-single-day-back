import { diaryType } from "@prisma/client";
interface IDiary {
  id: number;
  userId: number;
  type: diaryType;
  text: string;
  createdAt: string;
}

type DiarySchemaType = Omit<IDiary, "id" | "userId">;
type CreateDiaryType = Omit<IDiary, "id">;

export { IDiary, DiarySchemaType, CreateDiaryType };
