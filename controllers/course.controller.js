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
    const {categoryId} = req.query;
    if (categoryId) {
      const resl = await CourseService.getCoursesByCategory(categoryId);
      return res.json(resl);
    } else {
      const resl = await CourseService.getCourses();
      return res.json(resl);
    }
  }
};
