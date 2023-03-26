const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

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

const User = model("user", userSchema);

module.exports = { User, registerJoiSchema, loginJoiSchema };
