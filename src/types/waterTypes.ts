interface IWater {
  id: number;
  userId: number;
  waterQuantity: number;
  createdAt: string;
}

type WaterSchemaType = Omit<IWater, "id" | "userId">;
type CreateWaterType = Omit<IWater, "id">;

export { IWater, WaterSchemaType, CreateWaterType };
