import {
  findLastWeigth,
  findWeight,
  postWeight,
  updateWeight,
} from "../repositories/weightRepository";
import { CreateWeightType } from "../types/weightTypes";

async function postWeightService(newWeight: CreateWeightType) {
  const existingWeight = await findWeight(
    newWeight.createdAt,
    newWeight.userId
  );

  if (existingWeight) {
    await updateWeight(newWeight);
  } else {
    await postWeight(newWeight);
  }
}

async function findWeightService(userId: number) {
  const weight = await findLastWeigth(userId);
  if (!weight.length) {
    throw {
      code: "NotFound",
      message: "Theres no weight for this user",
    };
  }
  return weight;
}

export { postWeightService, findWeightService };
