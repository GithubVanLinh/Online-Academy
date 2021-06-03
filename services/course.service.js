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

  getCourses: async (page) => {
    const resl = await mGetCourses(page);
    return resl;
  },

  /**
   * get Course by category
   * @param {string} categoryId id of category
   * @param {Number} page paginate
   * @return {Promise<object>}
   */
  getCoursesByCategory: async (categoryId, page) => {
    const resl = await mGetCoursesByFilter("category", categoryId, page);
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
  },

  getCoursesSortBySoldNumber: async (categoryId) => {
    const resl = await mGetCoursesByFilter("category", categoryId, 1, "-soldNumer");
    return resl;
  }
};

/**
 * get Course object member
 * @param {string} courseId course id
 * @return {Promise<object>} courseObject or null
 */
async function mGetCourseByCourseId(courseId) {
  const resl = await CourseModel.findById(courseId)
    .populate({
      path: "courseLecturers",
      select: [
        "avatar",
        "username",
        "fullName",
        "email",
        "address",
        "phone",
        "description"
      ]
    })
    .populate("feedbacks")
    .populate("category");
  return resl;
}

/** get all courses
 * @param {Number} page paginate
 * @param {string} filter condition query
 * @param {string} sort sort string
 * @return {Promise<[object]>} list course
 */
async function mGetCourses(page, filter, sort) {
  const options = {
    limit: 5,
    sort: sort,
    populate: [
      {
        path: "courseLecturers",
        select: [
          "avatar",
          "username",
          "fullName",
          "email",
          "address",
          "phone",
          "description"
        ]
      },
      "feedbacks",
      "category"
    ],
    page: page
  };
  const resl = await CourseModel.paginate(filter, options);
  return resl;
  // const resl = await CourseModel.find(filter)
  //   .populate("courseLecturers")
  //   .populate("feedbacks")
  //   .populate("category");
  // return resl;
}

/**
 * get Courses with specitific condition
 * @param {string} type "category"|"lecturer"
 * @param {string} condition id
 * @param {Number} page paginate
 * @param {string} sort sort string
 */
async function mGetCoursesByFilter(type, condition, page, sort) {
  switch (type) {
    case "category":
      const filter = {
        category: condition
      };
      const resl = await mGetCourses(page, filter, sort);
      return resl;
      break;

    case "lecturer":
      break;
    default:
      break;
  }
}
