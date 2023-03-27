const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) {
    throw new RequestError(401, `Not authorized`);
  }

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204);
};

module.exports = logout;
