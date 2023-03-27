const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");

const getCurrent = async (req, res) => {
  const { _id, subscription, name, email } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new RequestError(401, `Not authorized`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
