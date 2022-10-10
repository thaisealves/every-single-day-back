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

describe("Testing /POST on login", () => {
  it("Must return 200 with the right body on login", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const loggedIn = await supertest(app).post("/login").send(loginUser);
    expect(loggedIn.status).toBe(200);
    expect(loggedIn.body).toBeInstanceOf(Object);
    expect(loggedIn.body).toHaveProperty("token");
  });
  it("Must return 401 with the wrong password on login", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: faker.internet.password(),
    };
    await supertest(app).post("/signup").send(user);
    const loggedIn = await supertest(app).post("/login").send(loginUser);
    expect(loggedIn.status).toBe(401);
  });
  it("Must return 404 if user doesn't exists", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: faker.internet.password(),
    };
    const loggedIn = await supertest(app).post("/login").send(loginUser);
    expect(loggedIn.status).toBe(404);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
