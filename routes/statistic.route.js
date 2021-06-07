"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsValidate = require("../middlewares/paramscheck.mdw");
const CourseController = require("../controllers/course.controller");
const CategoryController = require("../controllers/category.controller");

router.get("/same-course/:courseId", paramsValidate.checkCourseId, CourseController.getCourseSameCourseId);
router.get("/newestCourses", CourseController.getNewestCourses);
router.get("/mostViewedCourses", CourseController.getMostViewdCourses);
router.get("/featuredCourses", CourseController.getFeaturedCourses);
router.get("/featuredCategories", CategoryController.getFeaturedCategories)

module.exports = router;
