const express = require("express");

const { auth, ctrlWrapper, validation } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const { toggleSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(toggleSubscriptionSchema),
  ctrlWrapper(ctrl.toggleSubscription)
);
module.exports = router;
