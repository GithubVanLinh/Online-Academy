"use strict";
const ProgressService = require("../services/progress.service");
const EnrollmentService = require("../services/enrollment.service");
const LessonService = require("../services/lesson.service");

module.exports = {
  createOrUpdateProgress: async (req, res, next) => {
    const { userId, courseId, lessonId, progress } = req.body;

    let error;
    const didUserRegisterCourse = await EnrollmentService
      .didUserRegisterCourse(userId, courseId);

    // check if user registered the course
    if (didUserRegisterCourse) {
      const lesson = await LessonService.checkCousreIncludeLesson(courseId, lessonId);
      // check if lesson belongs to the course
      if (lesson) {
        if (progress < 0 || progress > lesson.totalLength) {
          error = "invalid progress";
        } else {
          // create or update progress
          const result = await ProgressService
            .createOrUpdateProgress(userId, lessonId, progress, lesson.totalLength);
          return res.json(result);
        }
      } else { // if not
        error = "course does not include the lesson"
      }
    } else { // if not
      error = "invalid userId or courseId"
    }
    res.status(400).json({ error })
  }
}