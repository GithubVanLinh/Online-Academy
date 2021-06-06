"use strict";

const CourseModel = require("../models/course.model");
const Config = require("../configs/constraints");
const enrollmentModel = require("../models/enrollment.model");
const courseModel = require("../models/course.model");
// const userModel = require("../models/user.model");

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

  /**
 *
 * @return {Array} top 10 newest courses of the week
 */
  getTenNewestCourses: async () => {
    let courses = [];
    try {
      courses = await CourseModel.find({
        status: {
          $in: [
            Config.COURSE_STATUS.INCOMPLETE,
            Config.COURSE_STATUS.COMPLETED
          ]
        }
      })
        .sort({ createdAt: "desc" })
        .limit(10)
        .populate([
          {
            path: "category",
            select: "categoryName"
          },
          {
            path: "courseLecturers",
            select: "fullName"
          }
        ])
        .select([
          "courseName",
          "category",
          "courseLecturers",
          "ratingPoint",
          "ratedNumber",
          "courseImage",
          "price",
          "promotionalPrice"
        ]);
    } catch (error) {
      throw Error(error);
    }
    return courses;
  },

  /**
 *
 * @return {Array} most viewed courses
 */
  getTenMostViewedCourse: async () => {
    try {
      const courses = await CourseModel.find({
        status: {
          $in: [
            Config.COURSE_STATUS.INCOMPLETE,
            Config.COURSE_STATUS.COMPLETED
          ]
        }
      })
        .sort({ view: "desc" })
        .limit(10)
        .populate([
          {
            path: "category",
            select: "categoryName"
          },
          {
            path: "courseLecturers",
            select: "fullName"
          }
        ])
        .select([
          "courseName",
          "category",
          "courseLecturers",
          "ratingPoint",
          "ratedNumber",
          "courseImage",
          "price",
          "promotionalPrice",
          "view"
        ]);
      return courses;
    } catch (error) {
      throw new Error(error);
    }
  },

  getTopFeaturedCourses: async () => {
    const aWeek = 7 * 24 * 60 * 60 * 1000;
    const startDate = new Date(Date.now() - aWeek);

    try {
      const enrollments = await enrollmentModel.find({
        registeredTime: {
          $gte: startDate
        }
      }).populate({
        path: "courseId",
        select: [
          "courseName",
          "category",
          "courseLecturers",
          "ratingPoint",
          "ratedNumber",
          "courseImage",
          "price",
          "promotionalPrice"
        ]
      });

      const courses = enrollments.map(enroll => enroll.courseId);
      // console.log(courses);

      const result = {};
      for (const course of courses) {
        if (course._id in result) {
          result[course._id].count++;
        } else {
          result[course._id] = {
            content: course,
            count: 1
          };
        }
      }
      // console.log(result);

      const arr = []
      // eslint-disable-next-line guard-for-in
      for (const prop in result) {
        arr.push(result[prop]);
      }

      arr.sort(function (a, b) {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      })

      arr.length = 3; // top 3 featured courses
      const Ids = arr.map(e => e.content._id);

      const ret = await courseModel.find({
        _id: {
          $in: Ids
        }
      }).populate([
        {
          path: "courseLecturers",
          select: "fullName"
        },
        {
          path: "category",
          select: "categoryName"
        }
      ]).select([
        "courseName",
        "category",
        "courseLecturers",
        "ratingPoint",
        "ratedNumber",
        "courseImage",
        "price",
        "promotionalPrice"
      ]);

      console.log(arr);
      // console.log(ret);

      return ret;
    } catch (error) {
      throw Error(error);
    }
  },

  getCoursesSortBySoldNumber: async (categoryId) => {
    const resl = await mGetCoursesByFilter("category", categoryId, 1, "-soldNumer");
    return resl;
  },

  createFeedback: async (courseId, feedbackData) => {
    const {userId, content, ratingPoint} = feedbackData;
    const haveEnrollment = await enrollmentModel.find({userId: userId, courseId: courseId}).exec();
    if (haveEnrollment.length) {
      const newFeedback = {userId, content, ratingPoint, createdAt: Date.now()};
      const course = await CourseModel.findByIdAndUpdate(courseId,
        {$push: {feedbacks: newFeedback}},
        {new: true}).exec();
      updateRatingPoint(course);
      await course.save();
      return newFeedback;
    }
    return null;
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
/**
 * Check valid rfToken by userId
 * @param {object} course refreshToken
 */
function updateRatingPoint(course) {
  const totalPoints = course.feedbacks.reduce((total, single) => total + single.ratingPoint, 0);
  course.ratingPoint = totalPoints/course.feedbacks.length;
}
