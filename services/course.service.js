"use strict";

const CourseModel = require("../models/course.model");
const Config = require("../configs/constraints");
const enrollmentModel = require("../models/enrollment.model");
const LecturerService = require("../services/lecturer.service");
const sectionModel = require("../models/section.model");
const lessonModel = require("../models/lesson.model");
const progressModel = require("../models/progress.model");
const ImgUtil = require("../utils/ImgUtil");
const fs = require("fs");
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

  seen: async (courseId, view) => {
    await CourseModel.findByIdAndUpdate(courseId, {
      view: view + 1
    });
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

  getCourses: async (page, options) => {
    if (options === "all") {
      const resl = await mGetAllCourses();
      return resl;
    } else {
      const resl = await mGetCourses(page);
      return resl;
    }
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
          $in: [Config.COURSE_STATUS.COMPLETED]
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
          $in: [Config.COURSE_STATUS.COMPLETED]
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
      const enrollments = await enrollmentModel
        .find({
          registeredTime: {
            $gte: startDate
          }
        })
        .populate({
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

      const courses = enrollments.map((enroll) => enroll.courseId);
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

      const arr = [];
      // eslint-disable-next-line guard-for-in
      for (const prop in result) {
        arr.push(result[prop]);
      }

      arr.sort(function(a, b) {
        if (a.count < b.count) {
          return 1;
        }
        if (a.count > b.count) {
          return -1;
        }
        return 0;
      });

      arr.length = 3; // top 3 featured courses
      const Ids = arr.map((e) => e.content._id);

      const ret = await CourseModel.find({
        _id: {
          $in: Ids
        }
      })
        .populate([
          {
            path: "courseLecturers",
            select: "fullName"
          },
          {
            path: "category",
            select: "categoryName"
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

      console.log(arr);
      // console.log(ret);

      return ret;
    } catch (error) {
      throw Error(error);
    }
  },

  getCoursesSortBySoldNumber: async (categoryId) => {
    const resl = await mGetCoursesByFilter(
      "category",
      categoryId,
      1,
      "-soldNumer"
    );
    return resl;
  },

  createFeedback: async (courseId, feedbackData) => {
    const { userId, content, ratingPoint } = feedbackData;
    const haveEnrollment = await enrollmentModel
      .find({ userId: userId, courseId: courseId })
      .exec();
    if (haveEnrollment.length) {
      const newFeedback = {
        userId,
        content,
        ratingPoint,
        createdAt: Date.now()
      };
      const course = await CourseModel.findById(courseId);
      const indexToUpdate = haveFeedbackYet(course, userId)
      if(indexToUpdate !== -1) {
        const { feedbacks } = course;
        feedbacks[indexToUpdate] = newFeedback;
        const updatedCourse = await CourseModel.findByIdAndUpdate(
          courseId,
          {feedbacks},
          {new: true}
        ).exec();
        updateRatingPoint(updatedCourse);
        await updatedCourse.save();
      } else {
        const updatedCourse = await CourseModel.findByIdAndUpdate(
          courseId,
          { $push: { feedbacks: newFeedback } },
          { new: true }
        ).exec();
        updateRatingPoint(updatedCourse);
        await course.save();
      }
      return newFeedback;
    }
    return null;
  },

  deleteCourse: async (courseId) => {
    const res = await CourseModel.findByIdAndUpdate(courseId, {
      status: Config.COURSE_STATUS.DELETED
    });
    return res;
  },

  /**
   *
   * @param {string} courseName name of course
   * @return {Promise<object>}
   */
  getCourseByName: async (courseName) => {
    let course;
    try {
      course = await CourseModel.findOne({
        courseName: courseName
      }).exec();
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  /**
   *
   * @param {string} courseId name of course
   * @return {Promise<object>}
   */
  getCourseById: async (courseId) => {
    let course = null;
    try {
      course = await CourseModel.findOne({
        _id: courseId
      }).exec();
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  /**
   *
   * @param {string} courseId
   * @return {Promise<void>}
   */
  modifyUpdatedTime: async (courseId) => {
    try {
      await CourseModel.findByIdAndUpdate(courseId, { updatedAt: Date.now() });
    } catch (e) {
      console.error(e);
    }
  },

  /**
   *
   * @param {object} courseInfo
   * @param {string} lecturerId id of lecturer
   * @return {Promise<object>}
   */
  createCourse: async (courseInfo, lecturerId) => {
    let course = null;
    try {
      const dataToCreate = {
        ...courseInfo,
        courseLecturers: [lecturerId]
      };
      console.log(dataToCreate);
      course = await CourseModel.create(dataToCreate);
      await LecturerService.addCourseToTeachingCourses(lecturerId, course._id);
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  changeCourseImage: async (courseId, imagePath) => {
    const newImageUrl = await ImgUtil.getNewFileUrl(imagePath);
    fs.unlinkSync(imagePath);
    const result = CourseModel.findByIdAndUpdate(
      courseId,
      { courseImage: newImageUrl, updatedAt: Date.now() },
      { new: true }
    ).select("courseImage");
    return result;
  },

  markCourseComplete: async (courseId) => {
    const result = await CourseModel.findByIdAndUpdate(
      courseId,
      { status: Config.COURSE_STATUS.COMPLETED, updatedAt: Date.now() },
      { new: true }
    ).select("status");
    return result;
  },

  changeCourseDescription: async (courseId, descriptions) => {
    const result = await CourseModel.findByIdAndUpdate(
      courseId,
      { ...descriptions, updatedAt: Date.now() },
      { new: true }
    ).select(["briefDescription", "detailDescription"]);
    return result;
  },
  removeAllLecturerFromCourses,

  getCourseSectionsById: async (courseId, userId) => {
    const sections = await sectionModel.find({ courseId });
    const lessons = await lessonModel.find({ courseId });
    const progresses = await progressModel.find({ userId });
    const newLessons = lessons.map((lesson) => ({
      ...lesson.toObject(),
      progress: progresses.find((pro) => pro.lessonId.equals(lesson._id))
    }));
    const newSections = sections.map((section) => ({
      ...section.toObject(),
      lessons: newLessons.filter((les) => les.sectionId.equals(section._id))
    }));
    return newSections;
  },
  getCourseSectionsByIdUnAth: async (courseId) => {
    const sections = await sectionModel.find({ courseId });
    const lessons = await lessonModel.find({ courseId });
    const newSections = sections.map((section) => ({
      ...section.toObject(),
      lessons: lessons.filter((les) => les.sectionId.equals(section._id))
    }));
    return newSections;
  },

  getCourseDetail: async (courseId) => {
    try {
      const course = await CourseModel.findById(courseId);
      const sections = await sectionModel.find({ courseId: courseId }).exec();
      const lessons = await lessonModel.find({ courseId: courseId }).exec();

      const pCourse = JSON.parse(JSON.stringify(course));
      let pSections = JSON.parse(JSON.stringify(sections));
      const pLessons = JSON.parse(JSON.stringify(lessons));

      pSections = pSections.map(section => ({ ...section, lessons: [] }));
      pSections.forEach(section => {
        pLessons.forEach(lesson => {
          if (lesson.sectionId === section._id) {
            section.lessons.push(lesson);
          }
        });
      });
      pCourse.sections = pSections;
      return pCourse;
    } catch (e) {
      throw Error(e);
    }
  },

  updateCourseBasicInfo: async (courseId, newInfo) => {
    try {
      return CourseModel.findByIdAndUpdate(courseId, newInfo, {
        new: true
      });
    } catch (e) {
      throw Error(e);
    }
  },

  getCourseWithSections: async (courseId) => {
    try {
      const course = await CourseModel.findById(courseId);
      const sections = await sectionModel.find({
        courseId: courseId
      });
      return { ...JSON.parse(JSON.stringify(course)), sections };
    } catch (e) {
      throw Error(e);
    }
  }

}
;

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

/** get all courses
 * @param {string} filter condition query
 * @param {string} sort sort string
 * @return {Promise<[object]>} list course
 */
async function mGetAllCourses() {
  // const options = {
  //   limit: 5,
  //   sort: sort,
  //   populate: [
  //     {
  //       path: "courseLecturers",
  //       select: [
  //         "avatar",
  //         "username",
  //         "fullName",
  //         "email",
  //         "address",
  //         "phone",
  //         "description"
  //       ]
  //     },
  //     "feedbacks",
  //     "category"
  //   ],
  //   page: page
  // };
  // const resl = await CourseModel.paginate(filter, options);
  // return resl;
  const resl = await CourseModel.find({})
    .populate("courseLecturers")
    .populate("feedbacks")
    .populate("category");
  return resl;
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
        category: condition,
        status: "COMPLETED"
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
  const totalPoints = course.feedbacks.reduce(
    (total, single) => total + single.ratingPoint,
    0
  );
  course.ratingPoint =
    Math.round((totalPoints / course.feedbacks.length) * 10) / 10;
}

/**
 * Check if course already have feedback by userId
 * @param {object} course
 * @param  {string} userId
 * @return {number}
 */
function haveFeedbackYet(course, userId) {
  const { feedbacks } = course;
  if (feedbacks.length) {
    for (const index in feedbacks.slice(0).reverse()) {
      if (feedbacks[index].userId.equals(userId)) {
        return feedbacks.length - 1 - index;
      }
    }
  }
  return -1;
}
/**
 * remove all courses
 * @param {string} lecturerId id
 */
async function removeAllLecturerFromCourses(lecturerId) {
  // TODO find courses
  const courses = await mFindAllCoursesContainLecturer(lecturerId);
  // TODO delete courses
  for (const course of courses) {
    await mRemoveLecturerFromCourse(course, lecturerId);
  }
}

/**
 * find all course contain lecturer
 * @param {string} lecturerId lecturer id
 * @return {Promise<Array>}
 */
async function mFindAllCoursesContainLecturer(lecturerId) {
  const courses = await CourseModel.find({
    courseLecturers: lecturerId
  });
  return courses;
}

/**
 * remove lecturer from course by lecturerId
 * @param {object} course course
 * @param {string} lecturerId id
 * @return {Promise}
 */
async function mRemoveLecturerFromCourse(course, lecturerId) {
  const list = course.courseLecturers;
  const index = list.indexOf(lecturerId);
  console.log(list, lecturerId, "index", index);
  if (index < 0) {
    throw new Error("lecturer not found");
  }
  list.splice(index, 1);

  const res = await CourseModel.findByIdAndUpdate(course._id, {
    courseLecturers: list
  });
  return res;
}
