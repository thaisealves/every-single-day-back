import { Request, Response } from "express";
import {
  createPictureService,
  getAllPictures,
} from "../services/visionService";
import { CreateVisionType } from "../types/visionTypes";

async function addNewPictureController(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newPic: CreateVisionType = req.body;
  await createPictureService(newPic, userId);

  res.sendStatus(201);
}

async function getPicturesController(req: Request, res: Response) {
  const userId: number = res.locals.userId; //getting from the token, only the user can see its pictures
  const pictures = await getAllPictures(userId);
  res.status(200).send(pictures);
}

export { addNewPictureController, getPicturesController };
