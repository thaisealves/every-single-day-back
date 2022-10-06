import {
  addNewPicture,
  existingPicture,
  getPictures,
} from "../repositories/visionRepository";
import { CreateVisionType } from "../types/visionTypes";

async function createPictureService(newPic: CreateVisionType, userId: number) {
  const findPic = await existingPicture(userId, newPic.image);

  if (findPic) {
    throw { code: "Conflict", message: "Image already existes for this user" };
  }

  await addNewPicture({ image: newPic.image, userId });
}

async function getAllPictures(userId: number) {
  const pictures = await getPictures(userId);
  return pictures;
}

export { createPictureService, getAllPictures };
