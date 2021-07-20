"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require("../configs/multer.config");
const UserController = require("../controllers/user.controller");
const Validator = require("../middlewares/validator.mdw");
const auth = require("../middlewares/auth.mdw");

router.post(
  "/",
  Validator.validateRequestBody("register_student"),
  UserController.createNewStudent
);

router.get("/:userId", auth, UserController.getUser);

// update user info (fullName, phone, address)
router.patch(
  "/:userId",
  Validator.validateRequestBody("update_user_info"),
  UserController.updateUserInfo
);

// change user password
router.patch(
  "/:userId/password",
  Validator.validateRequestBody("update_user_password"),
  UserController.updateUserPassword
);

// change user email
router.post(
  "/:userId/email",
  Validator.validateRequestBody("update_user_email"),
  UserController.makeEmailVerification
);

// verify change email
router.post(
  "/:userId/verify",
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

// user change avatar
router.post(
  "/:userId/avatar",
  upload.single("avaImage"),
  UserController.changeAvatar
);

module.exports = router;
