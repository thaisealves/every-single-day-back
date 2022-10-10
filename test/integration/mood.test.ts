import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/utils/database";
import { tokenFactory } from "../factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "mood" CASCADE`;
});
describe("Testing /POST on mood", () => {
  it("Must return 201 if the body is correct", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      mood: "happy",
    };

    const creating = await supertest(app)
      .post("/mood")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(creating.status).toBe(201);
  });
});
describe("Testing /GET on mood", () => {
  it("Must return 200 and an array of mood, with length == 1", async () => {
    const token = await tokenFactory();
    const body = {
      createdAt: "22-09-2011",
      mood: "happy",
    };
    await supertest(app)
      .post("/mood")
      .send(body)
      .set({ Authorization: `Bearer ${token.body.token}` });
    const getting = await supertest(app)
      .get(`/mood/${body.createdAt}`)
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(200);
    expect(getting.body).toBeInstanceOf(Object);
    expect(getting.body).toHaveProperty("mood");
  });
  it("Must return 404 if there's no mood for user", async () => {
    const token = await tokenFactory();

    const getting = await supertest(app)
      .get("/mood/18-04-2020")
      .send()
      .set({ Authorization: `Bearer ${token.body.token}` });

    expect(getting.status).toBe(404);
  });
});
afterAll(async () => {
  await prisma.$disconnect();
});
