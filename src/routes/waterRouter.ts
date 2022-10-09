import { Router } from "express";
import {
  addWaterController,
  findWaterController,
} from "../controllers/waterController";
import schemaValidation from "../middlewares/schemaValidation";
import { waterSchema } from "../schemas/waterSchemas";

const route = Router();

route.post("/water", schemaValidation(waterSchema), addWaterController);
route.get("/water/:day", findWaterController);
export default route;
