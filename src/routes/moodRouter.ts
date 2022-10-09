import { Router } from "express";
import {
  addMoodController,
  findMoodController,
} from "../controllers/moodController";
import schemaValidation from "../middlewares/schemaValidation";
import { moodSchema } from "../schemas/moodSchemas";

const route = Router();

route.post("/mood", schemaValidation(moodSchema), addMoodController);
route.get("/mood/:day", findMoodController);

export default route;
