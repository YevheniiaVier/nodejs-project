const {
  registerJoiSchema,
  loginJoiSchema,
  toggleSubscriptionSchema,
  verifyEmailSchema,
} = require("./userValidationSchemas");

const {
  addSchema,
  toggleFavoriteSchema,
} = require("./contactValidationSchemas");

module.exports = {
  registerJoiSchema,
  loginJoiSchema,
  toggleSubscriptionSchema,
  addSchema,
  toggleFavoriteSchema,
  verifyEmailSchema,
};
