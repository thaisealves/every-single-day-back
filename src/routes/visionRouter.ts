import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { addNewPicture, getPictures } from "../repositories/visionRepository";
import { visionSchema } from "../schemas/visionSchemas";

const route = Router();
route.post("/vision", schemaValidation(visionSchema), addNewPicture);
route.get("/visions", getPictures);
export default route;
