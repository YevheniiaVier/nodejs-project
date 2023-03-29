const { Contact } = require("../../models");
const { RequestError } = require("../../errorHandlers");
const gravatar = require("gravatar");

const addContact = async (req, res) => {
  const { _id } = req.user;

  const { email, phone } = req.body;
  const contactEmail = await Contact.findOne({ email });
  if (contactEmail) {
    throw new RequestError(409, `Contact with email:${email} already exists`);
  }
  const contactPhone = await Contact.findOne({ phone });
  if (contactPhone) {
    throw new RequestError(409, `Contact with phone:${phone} already exists`);
  }
  const avatarURL = gravatar.url(email);
  const contact = await Contact.create({ ...req.body, avatarURL, owner: _id });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: contact,
    },
  });
};

module.exports = addContact;
