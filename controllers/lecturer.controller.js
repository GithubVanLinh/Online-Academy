"use strict";
const LecturerService = require("../services/lecturer.service");
const UserService = require("../services/user.service");

module.exports = {
  login: async (req, res, next) => {
    const loginInfo = req.body;
    const result = await LecturerService.logIn(loginInfo);
    if (!result) {
      return res.status(400).json({
        message: "Log in failed!"
      });
    } else {
      return res.json(result);
    }
  },
  refreshAcToken: async (req, res, next) => {
    const refreshInfo = req.body;
    const result = await LecturerService.refreshAccessToken(refreshInfo);
    if (!result) {
      return res.status(400).json({
        message: "Refresh token is revoked!"
      });
    } else {
      return res.json(result);
    }
  },

  updateLecturerInfo: async (req, res, next) => {
    const lecturerId = req.params.lecturerId || 0;
    const newInfo = req.body;
    // console.log(newInfo);

    const updatedLecturer = await LecturerService.findAndUpdate(lecturerId, newInfo);

    if (updatedLecturer === null) {
      return res.status(400).json({
        error: "lecturer not found"
      });
    }
    res.json(updatedLecturer);
  },

  updateLecturerPassword: async (req, res, nect) => {
    const lecturerId = req.params.lecturerId || 0;
    const { currentPassword, newPassword } = req.body;

    // console.log("Current password: " + currentPassword);
    // console.log("New password: " + newPassword);

    try {
      const lecturer = await LecturerService.findById(lecturerId);
      if (lecturer) {
        const ret = await UserService.verifyPassword(currentPassword, lecturer.password);
        if (ret) {
          const updatedLecturer = await LecturerService.updatePassword(lecturer._id, newPassword);
          return res.json(updatedLecturer);
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
      error: "lecturer not found"
    });
  }

}







