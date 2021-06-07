"use strict";
const LessonService = require("../services/lesson.service");
const EnrollmentService = require("../services/enrollment.service");

module.exports = {
  getLessonById: async (req, res, next) => {
    const lessonId = req.params.lessonId || 0;
    const courseId = req.params.courseId || 0;

    // get userId from payload
    const { userId } = req.accessTokenPayload;

    // check if user have registered the course
    const didUserRegisterCourse = await EnrollmentService.didUserRegisterCourse(userId, courseId);

    if (didUserRegisterCourse === null) {
      return res.status(404).json({
        error: "user haven't registered the course yet"
      });
    }
    // get lesson info
    const lesson = await LessonService.getLessonById(lessonId, courseId);
    if (lesson === null) {
      return res.status(400).json({
        error: "incorrect lessonId"
      });
    }
    res.json(lesson);
  }
}