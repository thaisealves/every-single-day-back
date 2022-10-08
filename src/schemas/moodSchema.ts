const joi = require("joi").extend(require("@joi/date"));
import { moodType } from "@prisma/client";
const moodSchema = joi.object({
  mood: joi
    .string()
    .valid(...Object.values(moodType))
    .required(),
  createdAt: joi
    .date()
    .format(["DD/MM/YYYY", "DD-MM-YYYY", "MM/DD/YYYY", "MM-DD-YYYY"]),
});

export { moodSchema };
