const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find(
    { owner: _id },
    "name email phone favorite"
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
