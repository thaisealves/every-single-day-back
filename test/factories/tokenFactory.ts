import newUser from "./userFactory";
import supertest from "supertest";
import app from "../../src/app";
export async function tokenFactory() {
  const user = newUser();
  const loginUser = {
    email: user.email,
    password: user.password,
  };
  await supertest(app).post("/signup").send(user);
  const getToken = await supertest(app).post("/login").send(loginUser);
  return getToken;
}
