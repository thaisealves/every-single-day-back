import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";
import visionRouter from "./visionRouter";
import moodRouter from "./moodRouter";
import diaryRouter from "./diaryRouter";
import waterRouter from "./waterRouter";
import weightRouter from "./weightRouter";
const route = Router();

route.use(authRouter);
route.use(validateToken);
route.use(visionRouter);
route.use(moodRouter);
route.use(diaryRouter);
route.use(waterRouter);
route.use(weightRouter);
export default route;
