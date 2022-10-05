import {
  createUserRepository,
  findUserByEmail,
} from "../repositories/authRepository";
import { CreateUserType, SignInUserType } from "../types/authTypes";
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

async function loginService(user: SignInUserType) {
  const existingUser = await findUserByEmail(user.email);

  if (!existingUser) {
    throw { code: "Conflict", message: "User doesn't exists" };
  }
  verifyUser(user.password, existingUser.password);
}

function verifyUser(givenPass: string, originalPass: string) {
  if (!bcrypt.compareSync(givenPass, originalPass)) {
    throw { code: "Unauthorized", message: "Data doesn't match!" };
  }
}
export { createNewUser };
