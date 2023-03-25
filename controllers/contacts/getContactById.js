const { Contact } = require("../../models/contact");

const { RequestError } = require("../../errorHandlers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId, "contactID in getbyid");

  const contact = await Contact.findById(contactId);
  console.log(contact, "contact in getbyid");
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
