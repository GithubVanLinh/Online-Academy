"use strict";

const CourseModel = require("../models/course.model");
// const Constrainst = require("../configs/constrainst");

module.exports = {
  /**
   * get course by id
   * @param {string} courseId course id
   * @return {object} course object if exists, else return null
   */
  getCourseByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    return resl;
  },

  /**
   * get list lecturer of the course
   * @param {string} courseId course id
   * @return {[object]} list lecturer
   */
  getLecturersByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    const lecturers = resl.courseLecturers;
    return lecturers;
  },

  /**
   * get list feedback of the course
   * @param {string} courseId course id
   * @return {[object]} list feedback
   */
  getFeedbacksByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    const feedbacks = resl.feedbacks;
    return feedbacks;
  },

  getTenNewestCourses: async () => {
    const aWeek = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const startDate = new Date(now - aWeek);
    console.log(startDate);

    let courses = [];
    try {
      courses = await CourseModel.find({
        createdAt: {
          $gte: startDate
        }
      });
    } catch (error) {
      throw Error(error);
    }
    return courses;
  }

};

/**
 * get Course object member
 * @param {string} courseId course id
 * @return {object} courseObject or null
 */
async function mGetCourseByCourseId(courseId) {
  const resl = await CourseModel.findById(courseId)
    .populate("courseLecturers")
    .populate("feedbacks");
  return resl;
}
