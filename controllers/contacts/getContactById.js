const { Contact } = require("../../models");

const { RequestError } = require("../../errorHandlers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new RequestError(404, `Contact with id: ${contactId} is not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getContactById;
