const express = require("express");

const {
  validation,
  ctrlWrapper,
  auth,
  subscription,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const { registerJoiSchema, loginJoiSchema } = require("../../utils/validation");

const router = express.Router();

router.post(
  "/register",
  validation(registerJoiSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/login",
  subscription,
  validation(loginJoiSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
