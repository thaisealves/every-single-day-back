const joi = require("joi").extend(require("@joi/date"));
const waterSchema = joi.object({
  waterQuantity: joi.number().required(),
  createdAt: joi.date().format(["DD-MM-YYYY"]),
});

export { waterSchema };
