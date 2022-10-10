import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as weightRepository from "../../src/repositories/weightRepository";
import * as weightService from "../../src/services/weightService";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testing to add a weight", () => {
  it("Adding a weight if there's no weight for the user that day yet", async () => {
    const newWeight = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      weight: faker.datatype.number(100),
    };
    jest
      .spyOn(weightRepository, "findWeight")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(weightRepository, "postWeight")
      .mockImplementationOnce((): any => {});
    await weightService.postWeightService(newWeight);

    expect(weightRepository.findWeight).toBeCalled();
    expect(weightRepository.postWeight).toBeCalled();
  });
  it("Updating the weight if there's already a weight for the user that day", async () => {
    const newWeight = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      weight: faker.datatype.number(100),
    };
    jest
      .spyOn(weightRepository, "findWeight")
      .mockResolvedValueOnce({ ...newWeight, id: faker.datatype.number(10) });
    jest
      .spyOn(weightRepository, "updateWeight")
      .mockImplementationOnce((): any => {});
    await weightService.postWeightService(newWeight);

    expect(weightRepository.findWeight).toBeCalled();
    expect(weightRepository.updateWeight).toBeCalled();
  });
});
describe("Testing to find a weight", () => {
  it("Returning a weight if there's a weight for the user", async () => {
    const findWeight = {
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      weight: faker.datatype.number(100),
    };
    jest
      .spyOn(weightRepository, "findLastWeigth")
      .mockResolvedValueOnce([findWeight]);

    const result = await weightService.findWeightService(findWeight.userId);

    expect(weightRepository.findLastWeigth).toBeCalled();
    expect(result).toEqual([findWeight]);
    expect(result).toBeInstanceOf(Array);
  });
  it("Failing having weight for the user, no weight registred", async () => {
    const findWeight = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
    };
    jest
      .spyOn(weightRepository, "findLastWeigth")
      .mockImplementationOnce((): any => {});

    const promise = weightService.findWeightService(findWeight.userId);

    expect(weightRepository.findLastWeigth).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "NotFound",
      message: "Theres no weight for this user",
    });
  });
});
