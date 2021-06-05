"use strict";
const ProgressModel = require("../models/progress.model");
const EnrollmentService = require("../services/enrollment.service");
const LessonModel = require("../models/lesson.model");

module.exports = {
  /**
   * 
   * @param {String} userId id of user
   * @param {String} courseId id of course
   * @param {String} lessonId id of lesson
   * @param {Integer} progress progress of lesson
   */
  createOrUpdateProgress: async (userId, courseId, lessonId, progress) => {
    let ret = {};
    // check if user registered this course
    const didUserRegisterCourse = await EnrollmentService.didUserRegisterCourse(userId, courseId);

    if (didUserRegisterCourse) {
      // check if this lesson belongs to the course
      const doLessonBelongsToTheCourse = await LessonModel.findOne({
        _id: lessonId,
        courseId: courseId
      }).exec();
      if (doLessonBelongsToTheCourse) {
        const query = {
          userId: userId,
          lessonId: lessonId
        };
        const update = {
          progress: progress
        };
        const option = {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        };
        try {
          const result = await ProgressModel.findOneAndUpdate(query, update, option).exec();
          ret = result;
        } catch (error) {
          throw Error(error);
        }
      } else {
        ret.status = false;
        ret.error = "the course does not include the lesson";
      }
    } else {
      ret.status = false;
      ret.error = "incorrect userId or courseId";
    }
    return ret;
  },

  /**
   * 
   * @param {String} userId id of user
   * @param {String} courseId id of course
   * @param {String} lessonId id of lesson
   */
  finishLesson: async (userId, courseId, lessonId) => {
    let result = null;
    // check if user registered this course
    const didUserRegisterCourse = await EnrollmentService.didUserRegisterCourse(userId, courseId);
    if (didUserRegisterCourse) {
      const query = {
        userId: userId,
        lessonId: lessonId
      };
      const update = {
        isFinish: true
      };
      const option = {
        new: true
      }
      try {
        result = await ProgressModel.findOneAndUpdate(query, update, option);
      } catch (error) {
        throw Error(error);
      }
    }
    return result;
  }
}