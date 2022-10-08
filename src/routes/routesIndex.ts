import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";
import visionRouter from "./visionRouter";
import moodRouter from "./moodRouter";
import diaryRouter from "./diaryRouter";
const route = Router();

route.use(authRouter);
route.use(validateToken);
route.use(visionRouter);
route.use(moodRouter);
route.use(diaryRouter);
export default route;
