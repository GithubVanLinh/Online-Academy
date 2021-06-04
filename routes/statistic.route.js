"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsValidate = require("../middlewares/paramscheck.mdw");

const CourseController = require("../controllers/course.controller");

router.get("/same-course/:courseId", paramsValidate.checkCourseId, CourseController.getCourseSameCourseId);

module.exports = router;
