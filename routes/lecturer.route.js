"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require("../configs/multer.config");
// const Validator = require("../middlewares/validator.mdw");
const LecturerController = require("../controllers/lecturer.controller");
//
// router.post("/login", Validator.validateRequestBody("login"), LecturerController.login);
// router.post("/refresh", LecturerController.refreshAcToken);
router.get("/:lecturerId/courses", LecturerController.getCourses);
router.post("/:lecturerId/avatar", upload.single("avaImage"), LecturerController.changeAvatar);

module.exports = router;
