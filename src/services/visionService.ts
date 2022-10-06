import {
  addNewPicture,
  existingPicture,
  getPictures,
} from "../repositories/visionRepository";
import { CreateVisionType } from "../types/visionTypes";

async function createPictureService(newPic: CreateVisionType) {
  const findPic = await existingPicture(newPic.userId, newPic.image);

  if (findPic) {
    throw { code: "Conflict", message: "Image already existes for this user" };
  }

  await addNewPicture(newPic);
}

async function getAllPictures(userId: number) {
  const pictures = await getPictures(userId);
  return pictures;
}

export { createPictureService, getAllPictures };
