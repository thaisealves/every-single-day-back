interface INumberOfMeals {
  id: number;
  number: number;
  userId: number;
  createdAt: string;
}

interface IFood {
  id: number;
  typeId: number;
  userId: number;
  content: string;
  createdAt: string;
}

type CreateNumberOfMealsType = Omit<INumberOfMeals, "id">;
type NumberOfMealsSchemaType = Omit<INumberOfMeals, "id" | "userId">;
type CreateFoodType = Omit<IFood, "id">;
type FoodSchemaType = Omit<IFood, "id" | "userId">;

export {
  INumberOfMeals,
  IFood,
  CreateFoodType,
  CreateNumberOfMealsType,
  NumberOfMealsSchemaType,
  FoodSchemaType,
};
