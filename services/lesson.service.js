"use strict";
const LessonModel = require("../models/lesson.model");
const CourseService = require("../services/course.service");
const SectionService = require("../services/section.service");

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
  },

  /**
   *
   * @param {string} lessonInfo
   * @return {Promise<object>}
   */
  add: async (lessonInfo) => {
    let lesson = null;
    try {
      if (await getLessonByTitle(lessonInfo.title) === null) {
        lesson = await LessonModel.create(lessonInfo);
        if(lesson) {
          await SectionService.modifyUpdatedTime(lessonInfo.sectionId)
          await CourseService.modifyUpdatedTime(lessonInfo.courseId);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return lesson;
  }

};

/**
 *
 * @param {string} title
 * @return {Promise<object>}
 */
async function getLessonByTitle(title) {
  let lesson = null;
  try {
    lesson = await LessonModel.findOne({
      title: title
    }).exec();
  } catch (err) {
    console.error(err);
  }
  return lesson;
}