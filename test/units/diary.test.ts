import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as diaryRepository from "../../src/repositories/diaryRepository";
import * as diaryService from "../../src/services/diaryService";
import { CreateDiaryType, IDiary } from "../../src/types/diaryTypes";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testing to post a new diary", () => {
  it("Success on posting new diary", async () => {
    const newDiary: CreateDiaryType = {
      userId: faker.datatype.number(10),
      type: "plans",
      text: faker.lorem.paragraph(),
      createdAt: "20-09-2022",
    };
    jest
      .spyOn(diaryRepository, "findDiary")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(diaryRepository, "postDiary")
      .mockImplementationOnce((): any => {});
    await diaryService.createDiaryService(newDiary);

    expect(diaryRepository.findDiary).toBeCalled();
    expect(diaryRepository.postDiary).toBeCalled();
  });
  it("Fail on posting new diary with same type", async () => {
    const newDiary: CreateDiaryType = {
      userId: faker.datatype.number(10),
      type: "plans",
      text: faker.lorem.paragraph(),
      createdAt: "20-09-2022",
    };
    jest
      .spyOn(diaryRepository, "findDiary")
      .mockResolvedValueOnce({ ...newDiary, id: faker.datatype.number(10) });

    jest
      .spyOn(diaryRepository, "postDiary")
      .mockImplementationOnce((): any => {});
    const promise = diaryService.createDiaryService(newDiary);

    expect(diaryRepository.findDiary).toBeCalled();
    expect(diaryRepository.postDiary).not.toBeCalled();
    expect(promise).rejects.toEqual({
      code: "Conflict",
      message: "This kind of text already exists on this day",
    });
  });
});

describe("Getting the diaries", () => {
  it("Returning an array with diaries", async () => {
    const newDiary: IDiary = {
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
      type: "plans",
      text: faker.lorem.paragraph(),
      createdAt: "20-09-2022",
    };
    jest
      .spyOn(diaryRepository, "findDiariesFromDay")
      .mockResolvedValueOnce([newDiary]);

    const result = await diaryService.getDayDiaries(
      newDiary.createdAt,
      newDiary.userId
    );

    expect(diaryRepository.findDiariesFromDay).toBeCalled();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty("text");
  });
  it("Fail if diaris lenght from day is 0", async () => {
    jest.spyOn(diaryRepository, "findDiariesFromDay").mockResolvedValueOnce([]);

    const promise = diaryService.getDayDiaries(
      "20-09-2022", //createdAt
      faker.datatype.number(10) //userId
    );

    expect(diaryRepository.findDiariesFromDay).toBeCalled();
    expect(promise).rejects.toEqual({
      code: "NotFound",
      message: "This user doesn't have texts this day",
    });
  });
});
