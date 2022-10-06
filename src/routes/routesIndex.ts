import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";
import visionRouter from "./visionRouter";

const route = Router();

route.use(authRouter);
route.use(validateToken);
route.use(visionRouter);

export default route;
