"use strict";
const ProgressService = require("../services/progress.service");

module.exports = {
  createOrUpdateProgress: async (req, res, next) => {
    const { userId, courseId, lessonId, progress } = req.body;
    const result = await ProgressService
      .createOrUpdateProgress(userId, courseId, lessonId, progress);
    if (result.status === false) {
      return res.status(400).json({
        error: result.error
      });
    }
    res.json(result);
  }
}