import { Router } from "express";
import { createDiaryController } from "../controllers/diaryController";
import schemaValidation from "../middlewares/schemaValidation";
import { diarySchema } from "../schemas/diarySchemas";

const route = Router();

route.post("/diary", schemaValidation(diarySchema), createDiaryController);
route.get("/diary");
export default route;
