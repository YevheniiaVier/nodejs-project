const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");

const register = async (req, res) => {
  const { name, email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new RequestError(409, `User with email:${email} already exists`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        name,
      },
    },
  });
};

module.exports = register;
