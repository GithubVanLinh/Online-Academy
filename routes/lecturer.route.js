"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require("../configs/multer.config");
// const Validator = require("../middlewares/validator.mdw");
const LecturerController = require("../controllers/lecturer.controller");
//
// router.post("/login", Validator.validateRequestBody("login"), LecturerController.login);
// router.post("/refresh", LecturerController.refreshAcToken);
router.get("/:lecturerId/courses", LecturerController.getCourses);
router.post("/:lecturerId/avatar", upload.single("avaImage"), LecturerController.changeAvatar);

// update lecturer info (fullName, phone, address)
router.patch("/:lecturerId",
  Validator.validateRequestBody("update_user_info"),
  LecturerController.updateLecturerInfo
);

// change lecturer password
router.patch("/:lecturerId/password",
  Validator.validateRequestBody("update_user_password"),
  LecturerController.updateLecturerPassword
);

// change lecturer email
router.post("/:lecturerId/email",
  Validator.validateRequestBody("update_user_email"),
  LecturerController.makeEmailVerification
);

// verify lecturer email
router.post("/:lecturerId/verify",
  Validator.validateRequestBody("validate_student"),
  LecturerController.verifyAndUpdateEmail
);

module.exports = router;
