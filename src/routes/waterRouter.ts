import { Router } from "express";
import { addWaterController } from "../controllers/waterController";
import schemaValidation from "../middlewares/schemaValidation";
import { waterSchema } from "../schemas/waterSchemas";

const route = Router();

route.post("/water", schemaValidation(waterSchema), addWaterController);

export default route;
