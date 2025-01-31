const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");
const sendEmail = require("../../utils/sendEmail");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new RequestError(404, "Not found");
  }
  if (user.verify) {
    throw new RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Підтвердіть реєстрацію за посиланням</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
