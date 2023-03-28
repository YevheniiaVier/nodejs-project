const express = require("express");

const router = express.Router();
const {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
} = require("../../middlewares");

const { addSchema, toggleFavoriteSchema } = require("../../utils/validation");
const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validation(addSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(toggleFavoriteSchema),
  ctrlWrapper(ctrl.toggleFavorite)
);

module.exports = router;
