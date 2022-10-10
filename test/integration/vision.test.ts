import supertest from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/utils/database";
import { tokenFactory } from "../factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "visions" CASCADE`;
});
describe("Testing /POST on vision", () => {
  it("Must return 201 if the body is correct", async () => {
    const token = await tokenFactory();
    const body = {
      image: faker.image.imageUrl(),
    };

    const creating = await supertest(app)
      .post("/vision")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(201);
  });
  it("Must return 409 if image already exists", async () => {
    const token = await tokenFactory();
    const body = {
      image: faker.image.imageUrl(),
    };
    await supertest(app)
      .post("/vision")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const creating = await supertest(app)
      .post("/vision")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(409);
  });
});
describe("Testing /GET on visions", () => {
  it("Must return 200 and an array with pictures, with length > 0", async () => {
    const token = await tokenFactory();
    const body = {
      image: faker.image.imageUrl(),
    };
    await supertest(app)
      .post("/vision")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const getting = await supertest(app)
      .get("/visions")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Array);
    expect(getting.body.length).toBeGreaterThan(0);
  });
  it("Must return 200 and an array with no pictures if the user didn't post one", async () => {
    const token = await tokenFactory();

    const getting = await supertest(app)
      .get("/visions")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Array);
    expect(getting.body.length).toEqual(0);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
