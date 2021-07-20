"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const LessonController = require("../controllers/lesson.controller");

router.post("/",
  Validator.validateRequestBody("new_lesson"),
  LessonController.createLesson
);


module.exports = router;