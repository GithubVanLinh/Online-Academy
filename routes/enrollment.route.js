"use strict"
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const EnrollmentController = require("../controllers/enrolllment.controller");
const Validator = require("../middlewares/validator.mdw");


// enroll course
router.post("/",
  Validator.validateRequestBody("enrollment"),
  EnrollmentController.createEnrollment
);

module.exports = router;
