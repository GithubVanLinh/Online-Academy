"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsValidator = require("../middlewares/paramscheck.mdw");

const LecturerController = require("../controllers/lecturer.controller");
const CourseController = require("../controllers/course.controller");
const UserController = require("../controllers/user.controller");

// lecturer refresh accessToken
router.post("/refresh/lecturer", LecturerController.refreshAcToken);
router.delete(
  "/courses/:courseId",
  paramsValidator.checkCourseId,
  CourseController.removeCourse
);
router.get("/users", UserController.adminGetAllUser);

//  get student detail /users/:userId
router.get(
  "/users/:userId",
  paramsValidator.validateUserId,
  UserController.getUserDetail
);
router.delete(
  "/users/:userId",
  paramsValidator.validateUserId,
  UserController.deleteUser
);
module.exports = router;
