import { Request, Response } from "express";
import { createNewUser } from "../services/authService";
import { CreateUserType, SignUpUserType } from "../types/authTypes";

export async function singUpController(req: Request, res: Response) {
  const newUser: SignUpUserType = req.body;

  const formatedUser: CreateUserType = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };
  await createNewUser(formatedUser);

  res.sendStatus(201);
}
