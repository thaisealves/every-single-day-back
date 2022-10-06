import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import authRouter from "./authRouter";

const route = Router();
route.use(authRouter);
route.use(validateToken)
export default route;
