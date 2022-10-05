import { Request, Response } from "express";
import { createNewUser, loginService } from "../services/authService";
import {
  CreateUserType,
  SignInUserType,
  SignUpUserType,
} from "../types/authTypes";

async function singUpController(req: Request, res: Response) {
  const newUser: SignUpUserType = req.body;

  const formatedUser: CreateUserType = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };
  await createNewUser(formatedUser);

  res.sendStatus(201);
}

async function loginController(req: Request, res: Response) {
  const user: SignInUserType = req.body;

  const token = await loginService(user);

  res.status(200).send(token);
}

export { loginController, singUpController };
