"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const LecturerController = require("../controllers/lecturer.controller");

router.post("/login", Validator.validateRequestBody("login"), LecturerController.login);
router.post("/refresh", LecturerController.refreshAcToken);

// update user info (fullName, phone, address)
router.patch("/:lecturerId",
  Validator.validateRequestBody("update_user_info"),
  LecturerController.updateLecturerInfo
);

// change user password
router.patch("/:lecturerId/password",
  Validator.validateRequestBody("update_user_password"),
  LecturerController.updateLecturerPassword
);

// change user email
router.post("/:lecturerId/email",
  Validator.validateRequestBody("update_user_email"),
  LecturerController.makeEmailVerification
);

// verify change email
router.post("/:lecturerId/verify",
  Validator.validateRequestBody("validate_student"),
  LecturerController.verifyAndUpdateEmail
);

module.exports = router;
