const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../errorHandlers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new RequestError(
      400,
      `id: ${contactId} is not in correct format`
    );

    return next(error);
  }
  next();
};

module.exports = isValidId;
