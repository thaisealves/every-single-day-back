import supertest from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/utils/database";
import { tokenFactory } from "../factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "water" CASCADE`;
});
describe("Testing /POST on water", () => {
  it("Must return 201 if the body is correct", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      waterQuantity: faker.datatype.number(5),
    };

    const creating = await supertest(app)
      .post("/water")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(201);
  });
});
describe("Testing /GET on water/:day", () => {
  it("Must return 200 and an object of with water information", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      waterQuantity: faker.datatype.number(5),
    };
    await supertest(app)
      .post("/water")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const getting = await supertest(app)
      .get(`/water/${body.createdAt}`)
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });
    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Object);
    expect(getting.body).toHaveProperty("waterQuantity");
  });
  it("Must return 404 if there's no water for user that day", async () => {
    const token = await tokenFactory();

    const getting = await supertest(app)
      .get("/water/22-09-2011")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(404);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
