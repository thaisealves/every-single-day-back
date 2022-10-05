import { createUserRepository } from "../repositories/authRepository";
import { CreateUserType } from "../types/authTypes";
import bcrypt from "bcrypt";

async function createNewUser(newUser: CreateUserType) {
  const formatedUser = {
    ...newUser,
    password: bcrypt.hashSync(newUser.password, 10),
  };

  await createUserRepository(formatedUser);
}

export { createNewUser };
