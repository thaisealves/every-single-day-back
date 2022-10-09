import { exist } from "joi";
import {
  findWater,
  postWater,
  updateWater,
} from "../repositories/waterRepository";
import { CreateWaterType } from "../types/waterTypes";

async function addWater(newWater: CreateWaterType) {
  const existingWater = await findWater(newWater.createdAt, newWater.userId);
  if (!existingWater) {
    await postWater(newWater);
  } else {
    const body: CreateWaterType = {
      ...newWater,
      waterQuantity: newWater.waterQuantity + existingWater.waterQuantity,
    };
    await updateWater(body);
  }
}
async function findWaterQuantity(createrAt: string, userId: number) {
  const existingWater = await findWater(createrAt, userId);
  if (!existingWater) {
    throw { code: "NotFound", message: "No water for this user" };
  }
  return existingWater;
}
export { addWater, findWaterQuantity };
