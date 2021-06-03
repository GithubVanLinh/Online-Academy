"use strict";

const CourseService = require("../services/course.service");
const CategoryService = require("../services/category.service");

module.exports = {
  checkCourseId: async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
      const course = await CourseService.getCourseByCourseId(courseId);
      if (course != null) {
        return next();
      } else {
        throw new Error("not found course");
      }
    } catch (error) {
      return res.status(404).json({
        "error": "Invalid CourseId"
      })
    }
  },
  
  checkCategoryId: async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
      const category = await CategoryService.getCategoryByCategoryId(categoryId);
      if (category != null) {
        return next();
      } else {
        throw new Error("not found category");
      }
    } catch (error) {
      return res.status(404).json({
        "error": "Invalid categoryId"
      })
    }
  }
};
