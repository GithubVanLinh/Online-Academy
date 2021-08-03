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
    if (Math.round(progress) === Math.round(lessonLength)) {
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
  },

  /**
   *
   * @param {String} userId id of user
   * @param {String} lessonId id of lesson
   * @return {Object} progress
   */
  getProgress: async (userId, lessonId) => {
    let progress = null;
    try {
      progress = await ProgressModel.findOne({
        userId: userId,
        lessonId: lessonId
      }).exec();
    } catch (error) {
      console.error(error);
    }
    return progress;
  },

  deleteProgressesByCourseId: async (courseId) =>{
    return await mRemoveProgressByCourseId(courseId);
  },
  mRemoveProgressByUserId
}

/**
 * detele many progress
 * @param {string} courseId course id
 * @return {Promise<number>}
 */
 async function mRemoveProgressByCourseId(courseId) {
  const filter = {
    courseId: courseId
  };
  const res = await ProgressModel.deleteMany(filter);
  return res;
}

/**
 * detele many progress
 * @param {string} userId user id
 * @return {Promise<number>}
 */
 async function mRemoveProgressByUserId(userId) {
  const filter = {
    userId: userId
  };
  const res = await ProgressModel.deleteMany(filter);
  return res;
}
