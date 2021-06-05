"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const AuthController = require("../controllers/auth.controller");

// verify new user email
router.post("/verify", Validator.validateRequestBody("validate_student"), AuthController.verifyUser);
// user login
router.post("/login", Validator.validateRequestBody("login"), AuthController.login);
// user req new accessToken
router.post("/refresh", AuthController.refreshAcToken);
module.exports = router;
