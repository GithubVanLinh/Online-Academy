"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const Validator = require("../middlewares/validator.mdw");
const paramsValidate = require("../middlewares/paramscheck.mdw");
const queryValidate = require("../middlewares/querycheck.mdw");

const CourseController = require("../controllers/course.controller");
const LessonController = require("../controllers/lesson.controller");

const auth = require("../middlewares/auth.mdw");

router.get("/", queryValidate.checkCategoryId, CourseController.getCourses);

router.use("/:courseId", paramsValidate.checkCourseId);
router.get("/:courseId", CourseController.getCourseByCourseId);
router.get("/:courseId/lecturers", CourseController.getLecturersOfCourse);
router.get("/:courseId/feedbacks", CourseController.getFeedbacksOfCourse);
// send feedback
router.post("/:courseId/feedback", Validator.validateRequestBody("send_feedback"), CourseController.addFeedback);

// get lesson info
router.get("/:courseId/lessons/:lessonId", auth, LessonController.getLessonById);

module.exports = router;
