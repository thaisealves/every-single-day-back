import { Router } from "express";
import {
  addNumberOfMealsController,
  findNumberOfMealsController,
} from "../controllers/foodController";
import schemaValidation from "../middlewares/schemaValidation";
import { numberOfMealsSchema } from "../schemas/foodSchemas";

const route = Router();

route.post(
  "/meals",
  schemaValidation(numberOfMealsSchema),
  addNumberOfMealsController
);
route.get("/meals/:day", findNumberOfMealsController);

export default route