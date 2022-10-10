import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as authRepository from "../../src/repositories/authRepository";
import * as authService from "../../src/services/authService";
import jwt from "../../src/utils/jwt";
import newUser from "../factories/userFactory";
import bcrypt from "bcrypt";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testing the insert of new user", () => {
  it("Posting a new user", async () => {
    const user = newUser();
    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(authRepository, "createUserRepository")
      .mockImplementationOnce((): any => {});

    await authService.createNewUser(user);

    expect(authRepository.findUserByEmail).toBeCalled();
    expect(authRepository.createUserRepository).toBeCalled();
  });
  it("Not posting an existing user", async () => {
    const user = newUser();
    jest.spyOn(authRepository, "findUserByEmail").mockResolvedValueOnce({
      id: faker.datatype.number(),
      email: faker.internet.email(),
      name: faker.lorem.words(2),
      password: faker.internet.password(),
    });
    jest
      .spyOn(authRepository, "createUserRepository")
      .mockImplementationOnce((): any => {});

    const promise = authService.createNewUser(user);

    expect(promise).rejects.toEqual({
      code: "Conflict",
      message: "Email already in use",
    });
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(authRepository.createUserRepository).not.toBeCalled();
  });
});
describe("Testing the login of an user", () => {
  it("Don't login a non-existing user", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: user.password,
    };
    jest
      .spyOn(authRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {});
    const promise = authService.loginService(loginUser);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "NotFound",
      message: "User doesn't exists",
    });
  });
  it("Login an existing user", async () => {
    const user = newUser();
    const password = bcrypt.hashSync(user.password, 10);
    const loginUser = {
      email: user.email,
      password: user.password,
    };
    jest.spyOn(authRepository, "findUserByEmail").mockResolvedValueOnce({
      id: faker.datatype.number(),
      email: user.email,
      name: user.email,
      password,
    });
    jest.spyOn(jwt, "createToken").mockImplementationOnce((): any => {
      return faker.datatype.string();
    });
    const result = await authService.loginService(loginUser);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(result).toHaveProperty("token");
  });
  it("Dont login with wrong password", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: user.password,
    };
    jest.spyOn(authRepository, "findUserByEmail").mockResolvedValueOnce({
      id: faker.datatype.number(),
      email: user.email,
      name: user.email,
      password: user.password, //should be hashed to work out
    });

    const promise = authService.loginService(loginUser);
    expect(authRepository.findUserByEmail).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "Unauthorized",
      message: "Data doesn't match!",
    });
  });
});
