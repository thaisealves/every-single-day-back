const joi = require("joi").extend(require("@joi/date"));
const weigthSchema = joi.object({
  weight: joi.number().required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
});

export { weigthSchema };
