import { Router } from "express";
import {
  addFoodController,
  addNumberOfMealsController,
  findFoodsController,
  findNumberOfMealsController,
} from "../controllers/foodController";
import schemaValidation from "../middlewares/schemaValidation";
import { foodSchema, numberOfMealsSchema } from "../schemas/foodSchemas";

const route = Router();

route.post(
  "/meals",
  schemaValidation(numberOfMealsSchema),
  addNumberOfMealsController
);
route.get("/meals/:day", findNumberOfMealsController);

route.post("/food", schemaValidation(foodSchema), addFoodController);
route.get("/food/:day", findFoodsController);

export default route;
