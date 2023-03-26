const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
  console.log(User, "ffffffff", req.user);
};

module.exports = getCurrent;
