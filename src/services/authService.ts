import {
  createUserRepository,
  findUserByEmail,
} from "../repositories/authRepository";
import { CreateUserType } from "../types/authTypes";
import bcrypt from "bcrypt";

async function createNewUser(newUser: CreateUserType) {
  const existingUser = await findUserByEmail(newUser.email);

  const formatedUser: CreateUserType = {
    ...newUser,
    password: bcrypt.hashSync(newUser.password, 10),
  };
  
  if (existingUser) {
    throw { code: "Conflict", message: "Email already in use" };
  }

  await createUserRepository(formatedUser);
}

export { createNewUser };
