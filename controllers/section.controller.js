"use strict";
const SectionService = require("../services/section.service");
const CourseService = require("../services/course.service");

const createSection = async (req, res) => {
  const sectionInfo = req.body;

  // check if course exists
  const course = await CourseService.getCourseById(sectionInfo.courseId);
  if (course === null) {
    return res.status(400).json({
      error: "course not found"
    });
  }

  // create new section to the course
  const newSection = await SectionService.add(sectionInfo);
  if (newSection === null) {
    return res.status(400).json({
      error: "invalid input"
    });
  } else {
    // update property "updatedAt" of course
    await CourseService.modifyUpdatedTime(sectionInfo.courseId);
  }
  res.json(newSection);
};


module.exports = {
  createSection: createSection
};