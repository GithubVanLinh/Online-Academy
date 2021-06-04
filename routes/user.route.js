"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const UserController = require("../controllers/user.controller");
const Validator = require("../middlewares/validator.mdw");


router.post("/", Validator.validateRequestBody("register_student"), UserController.createNewStudent);

// update user info (fullName, email, phone, address)
router.patch("/:userId",
  Validator.validateRequestBody("update_user_info"),
  UserController.updateUserInfo
);

// change user password
router.patch("/:userId/password",
  Validator.validateRequestBody("update_user_password"),
  UserController.updateUserPassword
);

module.exports = router;
