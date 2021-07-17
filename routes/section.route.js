"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const SectionController = require("../controllers/section.controller");

// Add section to course
router.post("/",
  Validator.validateRequestBody("new_section"),
  SectionController.createSection
);

router.get("/")


module.exports = router;