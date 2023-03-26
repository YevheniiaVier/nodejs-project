const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    req.query.favorite === undefined
      ? { owner: _id }
      : { owner: _id, favorite },
    "name email phone favorite",
    { skip, limit: Number(limit) }
  ).populate("owner", "_id name email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
