const joi = require("joi").extend(require("@joi/date"));
const numberOfMealsSchema = joi.object({
  number: joi.number().required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
});

export { numberOfMealsSchema };
