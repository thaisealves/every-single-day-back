import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";
import visionRouter from "./visionRouter";
import moodRouter from "./moodRouter";
const route = Router();

route.use(authRouter);
route.use(validateToken);
route.use(visionRouter);
route.use(moodRouter);
export default route;
