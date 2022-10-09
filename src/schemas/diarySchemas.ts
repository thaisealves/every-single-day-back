const joi = require("joi").extend(require("@joi/date"));
import { diaryType } from "@prisma/client";
const diarySchema = joi.object({
  type: joi
    .string()
    .valid(...Object.values(diaryType))
    .required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
  text: joi.string().required(),
});

export { diarySchema };
