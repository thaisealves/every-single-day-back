import { CreateUserType } from "../types/authTypes";
import { prisma } from "../utils/database";

async function createUserRepository(newUser: CreateUserType) {
  await prisma.users.create({
    data: newUser,
  });
}

export {createUserRepository}