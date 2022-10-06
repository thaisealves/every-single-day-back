import joi from "joi";
import { CreateVisionType } from "../types/visionTypes";

const visionSchema = joi.object<CreateVisionType>({
  userId: joi.number().required(),
  image: joi.string().uri(),
});

export {visionSchema}