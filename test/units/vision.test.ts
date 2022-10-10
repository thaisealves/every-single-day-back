import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import * as visionRepository from "../../src/repositories/visionRepository";
import * as visionService from "../../src/services/visionService";
beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testing the insert of new images", () => {
  it("Should post a new image", async () => {
    const image = {
      image: faker.image.imageUrl(),
    };
    jest
      .spyOn(visionRepository, "existingPicture")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(visionRepository, "addNewPicture")
      .mockImplementationOnce((): any => {});
    await visionService.createPictureService(image, faker.datatype.number(10));

    expect(visionRepository.existingPicture).toBeCalled();
    expect(visionRepository.addNewPicture).toBeCalled();
  });
  it("Should post a new image", async () => {
    const existingPicture = {
      image: faker.image.imageUrl(),
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
    };
    jest
      .spyOn(visionRepository, "existingPicture")
      .mockResolvedValue(existingPicture);
    jest
      .spyOn(visionRepository, "addNewPicture")
      .mockImplementationOnce((): any => {});
    const promise = visionService.createPictureService(
      { image: existingPicture.image },
      existingPicture.userId
    );

    expect(visionRepository.existingPicture).toBeCalled();
    expect(visionRepository.addNewPicture).not.toBeCalled();
    expect(promise).rejects.toEqual({
      code: "Conflict",
      message: "Image already existes for this user",
    });
  });
});

describe("Testing to get the pictures from user", () => {
  it("Must have the value of array with pictures if its posted", async () => {
    const existingPicture = {
      image: faker.image.imageUrl(),
      id: faker.datatype.number(10),
      userId: faker.datatype.number(10),
    };
    jest
      .spyOn(visionRepository, "getPictures")
      .mockResolvedValue([existingPicture]);

    const result = await visionService.getAllPictures(existingPicture.userId);
    expect(visionRepository.getPictures).toBeCalled();
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty("image");
  });
  it("Must have the value of an empty array if no pictures is posted", async () => {
    jest.spyOn(visionRepository, "getPictures").mockResolvedValue([]);
    const result = await visionService.getAllPictures(
      faker.datatype.number(10)
    );
    expect(visionRepository.getPictures).toBeCalled();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });
});
