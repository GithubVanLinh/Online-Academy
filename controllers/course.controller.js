"use strict";

const CourseService = require("../services/course.service");
const EnrollmentService = require("../services/enrollment.service");
const LecturerService = require("../services/lecturer.service");
const UserService = require("../services/user.service");
const SectionService = require("../services/section.service");
const LessonService = require("../services/lesson.service");
const ProgressService = require("../services/progress.service");

module.exports = {
  reverseCourse: async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
      await CourseService.reverseCourse(courseId);
      res.status(200).json({
        courseId: courseId
      });
    } catch (error) {
      res.status(400).json({
        error_message: "Error when reverse course"
      });
    }
  },
  getCourseByCourseId: async (req, res, next) => {
    const courseId = req.params.courseId;
    const courseObject = await CourseService.getCourseByCourseId(courseId);
    try {
      await CourseService.seen(courseId, courseObject.view);
      res.json(courseObject);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getLecturersOfCourse: async (req, res, next) => {
    const courseId = req.params.courseId;
    const lecturers = await CourseService.getLecturersByCourseId(courseId);
    res.json(lecturers);
  },
  getFeedbacksOfCourse: async (req, res, next) => {
    const courseId = req.params.courseId;
    const feedbacks = await CourseService.getFeedbacksByCourseId(courseId);
    res.json(feedbacks);
  },
  getCourses: async (req, res, next) => {
    const { categoryId, options } = req.query;

    const page = +req.query.page || 1;
    if (categoryId) {
      const resl = await CourseService.getCoursesByCategory(
        categoryId,
        page,
        options
      );
      return res.json(resl);
    } else {
      const resl = await CourseService.getCourses(page, options);
      return res.json(resl);
    }
  },
  getNewestCourses: async (req, res, next) => {
    const tenNewestCourses = await CourseService.getTenNewestCourses();
    res.json(tenNewestCourses);
  },
  getMostViewdCourses: async (req, res, next) => {
    const mostViewdCourses = await CourseService.getTenMostViewedCourse();
    res.json(mostViewdCourses);
  },
  getFeaturedCourses: async (req, res, next) => {
    const featuredCourses = await CourseService.getTopFeaturedCourses();
    res.json(featuredCourses);
  },
  getCourseSameCourseId: async (req, res, next) => {
    const courseId = req.params.courseId;

    const course = await CourseService.getCourseByCourseId(courseId);
    const categoryId = course.category._id;
    const resl = await CourseService.getCoursesSortBySoldNumber(categoryId);
    res.json(resl.docs);
  },
  addFeedback: async (req, res, next) => {
    const courseId = req.params.courseId;
    const feedbackData = req.body;
    try {
      const feedback = await CourseService.createFeedback(
        courseId,
        feedbackData
      );
      if (feedback) {
        return res.json(feedback);
      } else {
        return res.status(400).json({
          error: "cannot add feedback"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error
      });
    }
  },
  removeCourse: async (req, res, next) => {
    const courseId = req.params.courseId;

    await CourseService.deleteCourse(courseId);
    await LecturerService.removeCourseFromTeachingCoursesForAllLecturer(
      courseId
    );
    await EnrollmentService.deleteEnrollmentByCourseId(courseId);
    await UserService.removeCourseFromWishListForAllUser(courseId);
    await SectionService.mRemoveSectionsByCourseId(courseId);
    await LessonService.removeLessonsByCourseId(courseId);
    await ProgressService.deleteProgressesByCourseId(courseId);

    res.status(200).json({
      message: `${courseId} delete success`
    });
  },
  updateCourseImage: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const imgFilePath = req.file.path;
      const course = await CourseService.changeCourseImage(
        courseId,
        imgFilePath
      );
      return res.json(course);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Course not found" });
    }
  },
  markCompleted: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const course = await CourseService.markCourseComplete(courseId);
      return res.json(course);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Course not found" });
    }
  },
  updateDescription: async (req, res, next) => {
    try {
      const courseId = req.params.courseId;
      const descriptions = req.body;
      const course = await CourseService.changeCourseDescription(
        courseId,
        descriptions
      );
      return res.json(course);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Course not found" });
    }
  },
  getCourseSections: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const { userId } = req.accessTokenPayload;
      const sections = await CourseService.getCourseSectionsById(
        courseId,
        userId
      );
      return res.json(sections);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Course not found" });
    }
  },
  getCourseSectionsUnAuth: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const sections = await CourseService.getCourseSectionsByIdUnAth(courseId);
      return res.json(sections);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Course not found" });
    }
  },
  updateBasicInfo: async (req, res) => {
    const userId = req.accessTokenPayload.userId;
    const courseId = req.params.courseId;
    const info = req.body;

    if (await LecturerService.checkTeachingCourse(userId, courseId)) {
      const course = await CourseService.updateCourseBasicInfo(courseId, info);
      console.log(course);
      return res.json(course);
    } else {
      return res.status(400).json({
        error: "The course does not belong to the lecturer"
      });
    }
  }
};
