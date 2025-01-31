const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const toggleFavorite = require("./toggleFavorite");
const updateAvatar = require("./updateAvatar");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavorite,
  updateAvatar,
};
