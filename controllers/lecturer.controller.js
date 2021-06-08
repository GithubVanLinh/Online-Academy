"use strict";
const LecturerService = require("../services/lecturer.service");

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
  }

}







