import joi from "joi";
import { CreateVisionType } from "../types/visionTypes";

const visionSchema = joi.object<CreateVisionType>({
  image: joi.string().uri().required(),
});

export { visionSchema };
