import supertest from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/utils/database";
import { tokenFactory } from "../factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "userWeight" CASCADE`;
});
describe("Testing /POST on weight", () => {
  it("Must return 201 if the body is correct", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      weight: faker.datatype.number(100),
    };

    const creating = await supertest(app)
      .post("/weight")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(201);
  });
});
describe("Testing /GET on weight", () => {
  it("Must return 200 and an array of weight, with length == 1", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      weight: faker.datatype.number(100),
    };
    await supertest(app)
      .post("/weight")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const getting = await supertest(app)
      .get(`/weight`)
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });
    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Array);
    expect(getting.body.length).toEqual(1);
  });
  it("Must return 404 if there's no weight for user", async () => {
    const token = await tokenFactory();

    const getting = await supertest(app)
      .get("/weight")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(404);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
