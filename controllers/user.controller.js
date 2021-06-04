"use strict";
const UserService = require("../services/user.service");
module.exports = {
  createNewStudent: async (req, res, next) => {
    const body = req.body;
    const user = await UserService.createUser(body);
    if (user === null) {
      return res.status(400).json({
        error: "cannot create user"
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
    }
    res.status(204).end();
  },

  updateUserPassword: async (req, res, next) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;
    console.log("Current password: " + currentPassword);
    console.log("New password: " + newPassword);

    try {
      const user = await UserService.findUserById(userId);
      if (user) {
        const ret = await UserService.verifyPassword(currentPassword, user.password);
        if (ret) {
          const newUser = await UserService.updatePassword(user._id, newPassword);
          return res.json(newUser);
        } else {
          return res.status(400).json({
            error_message: "Incorrect password"
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    res.status(400).json({
      error_message: "User not found"
    });
  }
};
