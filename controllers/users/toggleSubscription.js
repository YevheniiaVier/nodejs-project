const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");

const toggleSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!user) {
    throw new RequestError(401, `Not authorized`);
  }
  if (!Object.keys(req.body).includes("subscription")) {
    throw new RequestError(400, "missing field subscription");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: user,
    },
  });
};

module.exports = toggleSubscription;
