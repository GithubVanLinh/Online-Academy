"use strict";
const LessonModel = require("../models/lesson.model");
const CourseService = require("../services/course.service");
const SectionService = require("../services/section.service");

module.exports = {
  /**
   *
   * @param {string} courseId id of course
   * @param {string } lessonId id of lesson
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
      })
        .select(["title", "videoUrl", "totalLength"])
        .exec();
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
      const existsLesson = await getLessonByTitle(lessonInfo.title, lessonInfo.sectionId, lessonInfo.courseId);
      if (existsLesson === null) {
        lesson = await LessonModel.create(lessonInfo);
        if (lesson) {
          await SectionService.modifyUpdatedTime(lessonInfo.sectionId);
          await CourseService.modifyUpdatedTime(lessonInfo.courseId);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return lesson;
  },

  removeLessonsByCourseId: async (courseId) => {
    return await mRemoveLessonByCourseId(courseId);
  }
};

/**
 * detele many lesson
 * @param {string} courseId course id
 * @return {Promise<number>}
 */
async function mRemoveLessonByCourseId(courseId) {
  const filter = {
    courseId: courseId
  };
  const updateData = {
    isDeleted: true
  };
  const res = await LessonModel.updateMany(filter, updateData);
  return res;
}

/**
 *
 * @param {string} title
 * @param {string} sectionId
 * @param {string} courseId
 * @return {Promise<object>}
 */
async function getLessonByTitle(title, sectionId, courseId) {
  try {
    return await LessonModel.findOne({
      title: title, sectionId, courseId
    }).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// /**
//  * Check if lesson (title) already exists in the section of the course.
//  *
//  * @param {string} title
//  * @param {string} sectionId
//  * @param {string} courseId
//  * @return {Promise<object>}
//  * @private
//  */
// async function _didLessonExistsInSectionOfCourse(title, sectionId, courseId) {
//   try {
//     const lesson = await LessonModel.findOne({
//       title, sectionId, courseId
//     }).exec();
//     return !!lesson;
//   } catch (e) {
//     throw Error(e);
//   }
// }
