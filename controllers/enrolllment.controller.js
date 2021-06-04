"use strict";
const EnrollmentSevice = require("../services/enrollment.service");
const UserService = require("../services/user.service");
const CourseService = require("../services/course.service");

module.exports = {
  createEnrollment: async (req, res, next) => {
    const { userId, courseId } = req.body;
    console.log(userId, courseId);
    try {
      const user = await UserService.findUserById(userId);
      console.log(user);
      const course = await CourseService.getCourseByCourseId(courseId);
      if (user && course) {
        const enrollment = await EnrollmentSevice.createEnrollment(userId, courseId);
        if (enrollment) {
          return res.json(enrollment);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "user or course not found"
      });
    }
  }
}