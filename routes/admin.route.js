"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsValidator = require("../middlewares/paramscheck.mdw");
const bodyValidator = require("../middlewares/validator.mdw");
const Validator = require("../middlewares/validator.mdw");
const auth = require("../middlewares/auth.mdw");

const adminController = require("../controllers/admin.controller");
const LecturerController = require("../controllers/lecturer.controller");
const CourseController = require("../controllers/course.controller");
const UserController = require("../controllers/user.controller");
const categoryController = require("../controllers/category.controller");

router.post(
  "/login",
  Validator.validateRequestBody("login"),
  adminController.login
);
// lecturer refresh accessToken
router.post("/refresh/lecturer", LecturerController.refreshAcToken);
// admin req new accessToken
router.post("/refreshToken/", adminController.refreshAcToken);
router.delete(
  "/courses/:courseId",
  paramsValidator.checkCourseId,
  CourseController.removeCourse
);

router.patch(
  "/courses/:courseId",
  paramsValidator.checkCourseId,
  CourseController.reverseCourse
);

router.get("/users", UserController.adminGetAllUser);

router.get("/categories", categoryController.getCategories);

router.patch("/categories/:categoryId", categoryController.reverseCategory);

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

router.patch(
  "/users/:userId",
  paramsValidator.validateUserId,
  UserController.reverseUser
);

router.get("/lecturers", LecturerController.getAllLecturer);

router.post(
  "/lecturers",
  bodyValidator.validateRequestBody("create_lecturer"),
  LecturerController.createLecturer
);

router.patch("/lecturers/:lecturerId", LecturerController.reverseLecturer);

router.get(
  "/lecturers/:lecturerId",
  paramsValidator.checkLecturerId,
  LecturerController.getLecturerDetail
);

router.delete(
  "/lecturers/:lecturerId",
  paramsValidator.checkLecturerId,
  LecturerController.deleteLecturer
);

router.get("/:id", auth, adminController.getAdminInfo);

module.exports = router;
