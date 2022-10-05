import { CreateUserType } from "../types/authTypes";
import { prisma } from "../utils/database";

async function createUserRepository(newUser: CreateUserType) {
  await prisma.users.create({
    data: newUser,
  });
}

async function findUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}
export { createUserRepository, findUserByEmail };
