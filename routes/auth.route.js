"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const AuthController = require("../controllers/auth.controller");
const LecturerController = require("../controllers/lecturer.controller");

// verify new user email
router.post("/verify", Validator.validateRequestBody("validate_student"), AuthController.verifyUser);
// user login
router.post("/login/user", Validator.validateRequestBody("login"), AuthController.login);
// user req new accessToken
router.post("/refresh/user", AuthController.refreshAcToken);
// lecturer login
router.post("/login/lecturer", Validator.validateRequestBody("login"), LecturerController.login);
// lecturer refresh accessToken
router.post("/refresh/lecturer", LecturerController.refreshAcToken);

module.exports = router;
