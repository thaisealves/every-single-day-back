import { Router } from "express";
import {
  addNewPictureController,
  getPicturesController,
} from "../controllers/visionController";
import schemaValidation from "../middlewares/schemaValidation";
import { visionSchema } from "../schemas/visionSchemas";

const route = Router();
route.post("/vision", schemaValidation(visionSchema), addNewPictureController);
route.get("/visions", getPicturesController);
export default route;
