"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const CourseController = require("../controllers/course.controller")

router.get("/newestCourses", CourseController.getNewestCourses)

router.get("/:courseId", CourseController.getCourseByCourseId);
router.get("/:courseId/lecturers", CourseController.getLecturersOfCourse);
router.get("/:courseId/feedbacks", CourseController.getFeedbacksOfCourse);

module.exports = router;
