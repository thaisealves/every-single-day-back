import joi, { ref } from "joi";
import { SignInUserType, SignUpUserType } from "../types/authTypes";

const signUpSchema = joi.object<SignUpUserType>({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

const signInSchema = joi.object<SignInUserType>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
export { signUpSchema, signInSchema };
