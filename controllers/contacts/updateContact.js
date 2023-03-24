const { Contact } = require("../../models/contact");

const { IdError } = require("../../errorHandlers/");

const updateContact = async (req, res) => {
  if (!req.body) {
    const error = new Error(`Missing fields`);
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw new IdError(contactId);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};
module.exports = updateContact;
