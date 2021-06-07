"use strict";
const LessonService = require("../services/lesson.service");
const EnrollmentService = require("../services/enrollment.service");
const ProgressService = require("../services/progress.service");

module.exports = {
  getLessonById: async (req, res, next) => {
    const lessonId = req.params.lessonId || 0;
    const courseId = req.params.courseId || 0;

    // get userId from payload
    const { userId } = req.accessTokenPayload;

    // check if user have registered the course
    const didUserRegisterCourse = await EnrollmentService.didUserRegisterCourse(userId, courseId);

    if (didUserRegisterCourse === null) {
      return res.status(400).json({
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
    // get progress info of the lesson
    const progress = await ProgressService.getProgress(userId, lessonId);
    const result = {
      title: lesson.title,
      totalLength: lesson.totalLength,
      videoUrl: lesson.videoUrl,
      progress: (progress === null) ? 0 : progress.progress,
      isFinish: (progress === null) ? false : progress.isFinish
    };
    res.json(result);
  }
}