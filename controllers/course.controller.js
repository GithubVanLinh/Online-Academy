"use strict";

const CourseService = require("../services/course.service");

module.exports = {
  getCourseByCourseId: async (req, res, next) => {
    const courseId = req.params.courseId;
    const courseObject = await CourseService.getCourseByCourseId(courseId);
    res.json(courseObject);
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
    const { categoryId } = req.query;
    const page = +req.query.page || 1;
    if (categoryId) {
      const resl = await CourseService.getCoursesByCategory(categoryId, page);
      return res.json(resl);
    } else {
      const resl = await CourseService.getCourses();
      return res.json(resl);
    }
  },
  getNewestCourses: async (req, res, next) => {
    const tenNewestCourses = await CourseService.getTenNewestCourses();
    res.json(tenNewestCourses);
  }
};
