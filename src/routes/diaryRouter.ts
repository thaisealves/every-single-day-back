import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { diarySchema } from "../schemas/diarySchemas";

const route = Router();

route.post("/diary", schemaValidation(diarySchema));
route.get("/diary");
export default route;
