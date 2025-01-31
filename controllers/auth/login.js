const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const { subscription } = req.user;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new RequestError(401, `Email or password is wrong`);
  }
  if (!user.verify) {
    throw new RequestError(400, `Email is not verified`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
