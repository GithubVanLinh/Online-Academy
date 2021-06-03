"use strict";

const CourseModel = require("../models/course.model");
// const Constrainst = require("../configs/constrainst");

module.exports = {
  /**
   * get course by id
   * @param {string} courseId course id
   * @return {Promise<object>} course object if exists, else return null
   */
  getCourseByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    return resl;
  },

  /**
   * get list lecturer of the course
   * @param {string} courseId course id
   * @return {Promise<[object]>} list lecturer
   */
  getLecturersByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    const lecturers = resl.courseLecturers;
    return lecturers;
  },

  /**
   * get list feedback of the course
   * @param {string} courseId course id
   * @return {Promise<[object]>} list feedback
   */
  getFeedbacksByCourseId: async (courseId) => {
    const resl = await mGetCourseByCourseId(courseId);
    const feedbacks = resl.feedbacks;
    return feedbacks;
  },

  getCourses: async () => {
    const resl = await mGetCourses();
    return resl;
  },

  /**
   * get Course by category
   * @param {string} categoryId id of category
   * @return {Promise<object>}
   */
  getCoursesByCategory: async (categoryId) => {
    const resl = await mGetCoursesByFilter("category", categoryId);
    return resl;
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

},

/**
 * get Course object member
 * @param {string} courseId course id
 * @return {Promise<object>} courseObject or null
 */
async function mGetCourseByCourseId(courseId) {
  const resl = await CourseModel.findById(courseId)
    .populate("courseLecturers")
    .populate("feedbacks")
    .populate("category");
  return resl;
}

/** get all courses
 * @param {string} filter condition query
 * @return {Promise<[object]>} list course
 */
async function mGetCourses(filter) {
  const resl = await CourseModel.find(filter)
    .populate("courseLecturers")
    .populate("feedbacks")
    .populate("category");
  return resl;
}

/**
 * get Courses with specitific condition
 * @param {string} type "category"|"lecturer"
 * @param {string} condition id
 */
async function mGetCoursesByFilter(type, condition) {
  switch (type) {
    case "category":
      const filter = {
        "category": condition
      };
      const resl = await mGetCourses(filter);
      return resl;
      break;

    case "lecturer":
      break;
    default:
      break;
  }
}
