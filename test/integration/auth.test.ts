import { prisma } from "../../src/utils/database";
import { faker } from "@faker-js/faker";
import app from "../../src/app";
import supertest from "supertest";
import newUser from "../factories/userFactory";
beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`;
  });

describe("Testing /POST on signup", () => {
  it("Must return 201 when the body is correct", async () => {
    const user = newUser();
    const creating = await supertest(app).post("/signup").send(user);
    const userCreated = await prisma.users.findUnique({
      where: { email: user.email },
    });

    expect(creating.status).toBe(201);
    expect(userCreated).not.toBeNull;
  });
  it("Must return 422 when the body is incorrect", async () => {
    const user = newUser();
    const formatedUser = {
      ...user,
      confirmPassword: faker.internet.password(),
    };
    const creating = await supertest(app).post("/signup").send(formatedUser);
    const userCreated = await prisma.users.findUnique({
      where: { email: user.email },
    });

    expect(creating.status).toBe(422);
    expect(userCreated).toBeNull;
  });
  it("Must return 409 when there's already an user with this body", async () => {
    const user = newUser();
    await supertest(app).post("/signup").send(user);
    const creating = await supertest(app).post("/signup").send(user);

    expect(creating.status).toBe(409);
  });
});


afterAll(async () => {
    await prisma.$disconnect();
  });
  