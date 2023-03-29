const Joi = require("joi");

const registerJoiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(12)
    .required()
    .messages({ "any.required": "Missing required field: Name" }),
  email: Joi.string()

    .required()
    .messages({ "any.required": "Missing required field: Email" }),
  password: Joi.string()
    .min(6)
    .max(12)
    .required()
    .messages({ "any.required": "Missing required field: password" }),
  subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required field: Email" }),
  password: Joi.string()
    .min(6)
    .max(12)
    .required()
    .messages({ "any.required": "Missing required field: password" }),
});
const toggleSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = {
  registerJoiSchema,
  loginJoiSchema,
  toggleSubscriptionSchema,
};
