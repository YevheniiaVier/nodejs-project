const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required field: Name" }),
  phone: myCustomJoi
    .string()
    .required()
    .phoneNumber()
    .messages({ "any.required": "Missing required field: Phone" }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({ "any.required": "Missing required field: Email" }),
  favorite: Joi.boolean(),
});

const toggleFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = { addSchema, toggleFavoriteSchema };
