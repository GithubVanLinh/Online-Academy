"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const ProgressController = require("../controllers/progress.controller");
const Validator = require("../middlewares/validator.mdw");

// create or update progress
router.post("/",
  Validator.validateRequestBody("progress"),
  ProgressController.createOrUpdateProgress
);

module.exports = router;