import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as waterRepository from "../../src/repositories/waterRepository";
import * as waterService from "../../src/services/waterService";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Adding water test", () => {
  it("Should post water if it doesn't exists", async () => {
    const newWater = {
      userId: faker.datatype.number(10),
      createdAt: "22-09-2022",
      waterQuantity: faker.datatype.number(5),
    };
    jest
      .spyOn(waterRepository, "findWater")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(waterRepository, "postWater")
      .mockImplementationOnce((): any => {});
    await waterService.addWater(newWater);

    expect(waterRepository.findWater).toBeCalled();
    expect(waterRepository.postWater).toBeCalled();
  });
  it("Should update water if it already exists", async () => {
    const newWater = {
      userId: faker.datatype.number(10),
      createdAt: "22-09-2022",
      waterQuantity: faker.datatype.number(5),
    };
    jest
      .spyOn(waterRepository, "findWater")
      .mockResolvedValueOnce({ ...newWater, id: faker.datatype.number(10) });
    jest
      .spyOn(waterRepository, "updateWater")
      .mockImplementationOnce((): any => {});
    await waterService.addWater(newWater);

    expect(waterRepository.findWater).toBeCalled();
    expect(waterRepository.updateWater).toBeCalled();
  });
});
describe("Finding water test", () => {
  it("Returning an water object for success", async () => {
    const newWater = {
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
      createdAt: "22-09-2022",
      waterQuantity: faker.datatype.number(5),
    };
    jest.spyOn(waterRepository, "findWater").mockResolvedValueOnce(newWater);

    const result = await waterService.findWaterQuantity(
      newWater.createdAt,
      newWater.userId
    );

    expect(waterRepository.findWater).toBeCalled();
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual(newWater);
  });
  it("Failing on returning water", async () => {
    const newWater = {
      userId: faker.datatype.number(10),
      createdAt: "22-09-2022",
    };
    jest
      .spyOn(waterRepository, "findWater")
      .mockImplementationOnce((): any => {});

    const promise = waterService.findWaterQuantity(
      newWater.createdAt,
      newWater.userId
    );

    expect(waterRepository.findWater).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "NotFound",
      message: "No water for this user",
    });
  });
});
