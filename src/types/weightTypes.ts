interface IWeight {
  id: number;
  userId: number;
  weight: number;
  createdAt: string;
}

type WeightSchemaType = Omit<IWeight, "id" | "userId">;
type CreateWeightType = Omit<IWeight, "id">;

export { IWeight, WeightSchemaType, CreateWeightType };
