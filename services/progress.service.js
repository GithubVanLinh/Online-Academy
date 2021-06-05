"use strict";
const ProgressModel = require("../models/progress.model");

module.exports = {
  /**
   * 
   * @param {String} userId id of user
   * @param {String} lessonId id of lesson
   * @param {Number} progress progress of lesson
   * @param {String} lessonLength id of lesson
   * @return {object} progress
   */
  createOrUpdateProgress: async (userId, lessonId, progress, lessonLength) => {
    const query = {
      userId: userId,
      lessonId: lessonId
    };
    const update = {
      progress: progress
    };
    if (progress === lessonLength) {
      update.isFinish = true;
    }
    const option = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    };
    try {
      const result = await ProgressModel.findOneAndUpdate(query, update, option).exec();
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}