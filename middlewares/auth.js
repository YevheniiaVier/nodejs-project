const jwt = require("jsonwebtoken");

require("dotenv").config();

const { User } = require("../models");
const { SECRET_KEY } = process.env;

const { RequestError } = require("../errorHandlers");

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new RequestError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    return next(error);
  }
};

module.exports = auth;
