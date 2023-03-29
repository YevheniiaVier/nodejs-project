const {
  registerJoiSchema,
  loginJoiSchema,
  toggleSubscriptionSchema,
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
};
