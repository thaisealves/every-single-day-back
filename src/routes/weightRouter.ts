import { Router } from "express";
import {
  findWeightController,
  postWeightController,
} from "../controllers/weightController";
import schemaValidation from "../middlewares/schemaValidation";
import { weigthSchema } from "../schemas/weightSchema";

const route = Router();

route.post("/weight", schemaValidation(weigthSchema), postWeightController);
route.get("/weight", findWeightController);

export default route;
