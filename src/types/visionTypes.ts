interface IVision {
  id: number;
  userId: number;
  image: string;
}

type CreateVisionType = Omit<IVision, "id" | "userId">;
type AddVision = Omit<IVision, "id">;
export { IVision, CreateVisionType, AddVision };
