import { Router } from "express";
import {
  createDiaryController,
  getDiaries,
} from "../controllers/diaryController";
import schemaValidation from "../middlewares/schemaValidation";
import { diarySchema } from "../schemas/diarySchemas";

const route = Router();

route.post("/diary", schemaValidation(diarySchema), createDiaryController);
route.get("/diary/:day", getDiaries);
export default route;
