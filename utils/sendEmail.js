const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "gotashk1983@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "gotavier@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "email@mail.com",
//   from: "gotavier@meta.ua",
//   subject: "title",
//   html: "mail message",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("email  is sent successfully"))
//   .catch((error) => console.log(error.message));
