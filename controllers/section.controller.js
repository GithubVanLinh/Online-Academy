"use strict";
const SectionService = require("../services/section.service");
const CourseService = require("../services/course.service");

const createSection = async (req, res) => {
  const sectionInfo = req.body;
  let ret;
  let status = 400;
  let error;

  // check if course exists
  const course = await CourseService.getCourseById(sectionInfo.courseId);
  if (course === null) {
    error = "course not found";
  } else {
    const section = await SectionService.getByTitle(sectionInfo.title);

    if (section) {
      error = "section is already exists";
    } else {
      // create new section to the course
      const newSection = await SectionService.add(sectionInfo);

      if (newSection) {
        // update property "updatedAt" of course
        await CourseService.modifyUpdatedTime(sectionInfo.courseId);
        status = 201;
        ret = newSection;
      }
    }
  }
  res.status(status).json((status === 400) ? { error } : ret);
};


module.exports = {
  createSection
};