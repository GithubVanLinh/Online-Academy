"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsValidate = require("../middlewares/paramscheck.mdw");
const queryValidate = require("../middlewares/querycheck.mdw");

const CourseController = require("../controllers/course.controller");

router.get("/", queryValidate.checkCategoryId, CourseController.getCourses);
router.use("/:courseId", paramsValidate.checkCourseId);
router.get("/:courseId", CourseController.getCourseByCourseId);
router.get("/:courseId/lecturers", CourseController.getLecturersOfCourse);
router.get("/:courseId/feedbacks", CourseController.getFeedbacksOfCourse);

module.exports = router;
