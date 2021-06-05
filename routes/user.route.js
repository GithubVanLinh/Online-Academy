"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const UserController = require("../controllers/user.controller");
const Validator = require("../middlewares/validator.mdw");


router.post("/", Validator.validateRequestBody("register_student"), UserController.createNewStudent);

// update user info (fullName, email, phone, address)
router.patch("/:userId",
  Validator.validateRequestBody("update_user_info"),
  UserController.updateUserInfo
);

// change user password
router.patch("/:userId/password",
  Validator.validateRequestBody("update_user_password"),
  UserController.updateUserPassword
);

// change user email
router.post("/:userId/email",
  Validator.validateRequestBody("update_user_email"),
  UserController.makeEmailVerification
);

// verify change email
router.post("/:userId/verify",
  Validator.validateRequestBody("validate_student"),
  UserController.verifyAndUpdateEmail
);

// get wish list
router.get("/:userId/wishList", UserController.getUserWishList);

// add to wish list
router.post("/:userId/wishList", UserController.addCourseToWishList);

// delete from wish list
router.patch("/:userId/wishList", UserController.deleteUserCoursesFromWishList);

// get registered courses
router.get("/:userId/registeredList", UserController.getUserRegisteredList);

// send feedback
router.post("/:userId/feedback", Validator.validateRequestBody("send_feedback"), UserController.addFeedback);

module.exports = router;
