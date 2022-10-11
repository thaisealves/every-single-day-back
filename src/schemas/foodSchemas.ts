const joi = require("joi").extend(require("@joi/date"));
const numberOfMealsSchema = joi.object({
  number: joi.number().required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
});
const foodSchema = joi.object({
  type: joi.string().required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
  content: joi.string().required(),
});
export { numberOfMealsSchema, foodSchema };
