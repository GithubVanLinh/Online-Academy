"use strict";
const LessonModel = require("../models/lesson.model");

module.exports = {
  /**
   * 
   * @param {string} courseId id of course
   * @param {string } lessonId id of leeson
   * @return {object} ret
   */
  checkCousreIncludeLesson: async (courseId, lessonId) => {
    let ret = null;
    try {
      ret = await LessonModel.findOne({
        _id: lessonId,
        courseId: courseId
      }).exec();
    } catch (error) {
      console.log(error);
    }
    return ret;
  },

  /**
   * 
   * @param {String} lessonId id of lesson
   * @param {String} courseId id of course
   * @return {object} lesson
   */
  getLessonById: async (lessonId, courseId) => {
    let lesson = null;
    try {
      lesson = await LessonModel.findOne({
        _id: lessonId,
        courseId: courseId
      }).select([
        "title", "videoUrl", "totalLength"
      ]).exec();
    } catch (err) {
      console.error(err);
    }
    return lesson;
  }
}