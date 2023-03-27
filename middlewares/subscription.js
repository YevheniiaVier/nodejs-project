const { User } = require("../models");

const { RequestError } = require("../errorHandlers");

const subscription = async (req, _, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = subscription;
