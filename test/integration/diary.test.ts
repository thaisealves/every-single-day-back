import supertest from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/utils/database";
import { tokenFactory } from "../factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "diary" CASCADE`;
});
describe("Testing /POST on diary", () => {
  it("Must return 201 if the body is correct", async () => {
    const token = await tokenFactory();
    const body = {
      type: "plans",
      createdAt: "22-09-2011",
      text: faker.lorem.paragraph(),
    };

    const creating = await supertest(app)
      .post("/diary")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(201);
  });
  it("Must return 409 if image already exists", async () => {
    const token = await tokenFactory();
    const body = {
      type: "plans",
      createdAt: "22-09-2011",
      text: faker.lorem.paragraph(),
    };

    await supertest(app)
      .post("/diary")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const creating = await supertest(app)
      .post("/diary")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(409);
  });
});
describe("Testing /GET on diary/:day", () => {
  it("Must return 200 and an array of diaries, with length > 0", async () => {
    const token = await tokenFactory();
    const body = {
      type: "plans",
      createdAt: "22-09-2011",
      text: faker.lorem.paragraph(),
    };
    await supertest(app)
      .post("/diary")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const getting = await supertest(app)
      .get(`/diary/${body.createdAt}`)
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Array);
    expect(getting.body.length).toBeGreaterThan(0);
  });
  it("Must return 404 if there's no diary for user that day", async () => {
    const token = await tokenFactory();

    const getting = await supertest(app)
      .get("/diary/22-09-2011")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(404);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
