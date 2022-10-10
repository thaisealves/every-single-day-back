import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as moodRepository from "../../src/repositories/moodRepository";
import * as moodService from "../../src/services/moodService";
import { CreateMoodType, IMood } from "../../src/types/moodTypes";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testing to add a mood", () => {
  it("Adding a mood if there's no mood for the day", async () => {
    const newMood: CreateMoodType = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      mood: "happy",
    };
    jest
      .spyOn(moodRepository, "findMood")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(moodRepository, "addMoodRepository")
      .mockImplementationOnce((): any => {});
    await moodService.addMoodService(newMood);

    expect(moodRepository.findMood).toBeCalled();
    expect(moodRepository.addMoodRepository).toBeCalled();
  });
  it("Adding a mood if there's no mood for the day", async () => {
    const newMood: CreateMoodType = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      mood: "happy",
    };
    jest
      .spyOn(moodRepository, "findMood")
      .mockResolvedValueOnce({ ...newMood, id: faker.datatype.number(10) });
    jest
      .spyOn(moodRepository, "updateMood")
      .mockImplementationOnce((): any => {});
    await moodService.addMoodService(newMood);

    expect(moodRepository.findMood).toBeCalled();
    expect(moodRepository.updateMood).toBeCalled();
  });
});
describe("Testing to find a mood", () => {
  it("Returning a mood if there's a mood for the day", async () => {
    const findMood: IMood = {
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
      mood: "happy",
    };
    jest.spyOn(moodRepository, "findMood").mockResolvedValueOnce(findMood);

    const result = await moodService.findMoodService(
      findMood.userId,
      findMood.createdAt
    );

    expect(moodRepository.findMood).toBeCalled();
    expect(result).toEqual(findMood);
    expect(result).toBeInstanceOf(Object);
  });
  it("Failing having mood for the day, no mood", async () => {
    const findMood = {
      userId: faker.datatype.number(10),
      createdAt: "22-10-2022",
    };
    jest
      .spyOn(moodRepository, "findMood")
      .mockImplementationOnce((): any => {});

    const promise = moodService.findMoodService(
      findMood.userId,
      findMood.createdAt
    );

    expect(moodRepository.findMood).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "NotFound",
      message: "There's no mood for this user this day",
    });
  });
});
