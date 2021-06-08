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
  getCourses: async (req, res, next) => {
    const lecturerId = req.params.lecturerId;
    try {
      const result = await LecturerService.getTeachingCourses(lecturerId);
      if (!result) {
        return res.status(400).json({
          message: "lecturerId not right!"
        });
      } else {
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({error: error});
    }
  }
}







