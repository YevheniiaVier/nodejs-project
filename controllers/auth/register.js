const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { randomUUID } = require("crypto");

const sendEmail = require("../../utils/sendEmail");

const { User } = require("../../models");
const { RequestError } = require("../../errorHandlers");

const register = async (req, res) => {
  const { name, email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new RequestError(409, `User with email:${email} already exists`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = randomUUID();
  await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Registration confirmation",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Підтвердіть реєстрацію за посиланням</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        name,
        avatarURL,
      },
    },
  });
};

module.exports = register;
