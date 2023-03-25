const { Contact } = require("../../models");

const { RequestError } = require("../../errorHandlers/");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw new RequestError(404, `Contact with id: ${contactId} is not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeContact;
