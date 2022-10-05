import { signUpSchema, signInSchema } from "../schemas/authSchemas";
import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation";
import { loginController, singUpController } from "../controllers/authController";
const route = Router();
route.post("/signup", schemaValidation(signUpSchema), singUpController);
route.post("/login", schemaValidation(signInSchema), loginController);

export default route;
