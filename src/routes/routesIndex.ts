import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";
import visionRouter from "./visionRouter";
import moodRouter from "./moodRouter";
import diaryRouter from "./diaryRouter";
import waterRouter from "./waterRouter";
import weightRouter from "./weightRouter";
import e2eRouter from "./e2eRouter";
import dotenv from "dotenv";

dotenv.config();
const route = Router();

if (process.env.NODE_ENV === "test") {
  route.use(e2eRouter);
}
route.use(authRouter);
route.use(validateToken);
route.use(visionRouter);
route.use(moodRouter);
route.use(diaryRouter);
route.use(waterRouter);
route.use(weightRouter);
export default route;
