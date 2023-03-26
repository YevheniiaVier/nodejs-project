const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const { registerJoiSchema, loginJoiSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(registerJoiSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
