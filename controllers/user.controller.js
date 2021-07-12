"use strict";
const UserService = require("../services/user.service");
module.exports = {
  getUser: async (req, res, next) => {
    const { userId } = req.body;

    try {
      const user = await UserService.findUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({
        error_message: error
      });
    }
  },
  createNewStudent: async (req, res, next) => {
    const body = req.body;
    const user = await UserService.createUser(body);
    if (user === null) {
      return res.status(400).json({
        error_message: "cannot create user"
      });
    }
    return res.status(201).json(user);
  },

  updateUserInfo: async (req, res, next) => {
    const userId = req.params.userId || 0;
    const newInfo = req.body;
    // console.log(newInfo);

    try {
      const user = await UserService.findUserById(userId);
      // console.log(user);
      if (user) {
        const newUserInfo = await UserService.updateUserInfo(user._id, newInfo);
        return res.json(newUserInfo);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "user not found"
      });
    }
  },

  updateUserPassword: async (req, res, next) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;
    console.log("Current password: " + currentPassword);
    console.log("New password: " + newPassword);

    try {
      const user = await UserService.findUserById(userId);
      if (user) {
        const ret = await UserService.verifyPassword(
          currentPassword,
          user.password
        );
        if (ret) {
          const newUser = await UserService.updatePassword(
            user._id,
            newPassword
          );
          return res.json(newUser);
        } else {
          return res.status(400).json({
            error: "Incorrect password"
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    res.status(400).json({
      error: "User not found"
    });
  },

  makeEmailVerification: async (req, res, next) => {
    const email = req.body.email;
    const userId = req.params.userId;

    try {
      const user = await UserService.findUserById(userId);
      console.log(user);
      if (user) {
        const verification = await UserService.makeChangeEmailVerification(
          email
        );
        if (verification) {
          return res.json({
            message: "verify your email"
          });
        } else {
          return res.status(400).json({
            error: "email is already taken"
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "user not found"
      });
    }
  },

  verifyAndUpdateEmail: async (req, res, next) => {
    const userId = req.params.userId;
    const { email, key } = req.body;

    try {
      const user = await UserService.findUserById(userId);
      if (user) {
        const updatedUser = await UserService.verifyEmail(userId, email, key);
        if (updatedUser) {
          return res.json(updatedUser);
        } else {
          res.status(400).json({
            error: "incorrect email or key"
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "user not found"
      });
    }
  },

  getUserWishList: async (req, res, next) => {
    const userId = req.params.userId;
    const wishList = await UserService.getWishList(userId);
    if (wishList) {
      return res.json(wishList);
    }
    res.status(400).json({
      error: "user not found"
    });
  },

  addCourseToWishList: async (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.body.courseId;
    const wishList = await UserService.addToWishList(userId, courseId);
    if (wishList) {
      return res.json(wishList);
    }
    res.status(400).json({
      error: "user not found"
    });
  },

  deleteUserCoursesFromWishList: async (req, res, next) => {
    const userId = req.params.userId;
    const courseIds = req.body.courseIds;

    const newWishList = await UserService.deleteCoursesFromWishList(
      userId,
      courseIds
    );
    if (newWishList) {
      return res.json({
        wishList: newWishList.wishList
      });
    }
    res.status(400).json({
      error: "user not found"
    });
  },

  getUserRegisteredList: async (req, res, next) => {
    const userId = req.params.userId;
    const registeredList = await UserService.getRegisteredList(userId);
    if (registeredList) {
      const ret = registeredList.map((e) => e.courseId);
      return res.json(ret);
    }
    res.status(400).json({
      error: "user not found"
    });
  },

  changeAvatar: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const imgFilePath = req.file.path;
      const user = await UserService.changeUserAvatar(userId, imgFilePath);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "user not found" });
    }
  }
};
