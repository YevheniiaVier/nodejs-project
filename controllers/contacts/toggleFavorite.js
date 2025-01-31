const { Contact } = require("../../models");

const { RequestError } = require("../../errorHandlers/");

const toggleFavorite = async (req, res) => {
  if (!Object.keys(req.body).includes("favorite")) {
    throw new RequestError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
module.exports = toggleFavorite;
