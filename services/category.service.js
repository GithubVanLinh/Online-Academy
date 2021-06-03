"use strict";
const categoryModel = require("../models/category.model");
const enrollmentModel = require("../models/enrollment.model");

module.exports = {
  /**
   *
   * @return {Array} list category
   */
  getAll: async () => {
    return await categoryModel.find({});
  },

  getCategoryByCategoryId: async (categoryId) => {
    return await categoryModel.findById(categoryId);
  },

  getFeatured: async () => {
    try {
      const aWeek = 7 * 24 * 60 * 60 * 1000;
      const startDate = new Date(Date.now() - aWeek);

      const enrollments = await enrollmentModel.find({
        registeredTime: {
          $gte: startDate
        }
      }).populate({
        path: "courseId",
        select: "category"
      });
      // console.log(enrollment);

      const categoryIds = enrollments.map(e => e.courseId.category)
        // remove duplicate
        .filter((id, index, arr) => arr.indexOf(id) === index);
      // console.log(categoryIds);

      const categories = await categoryModel.find({
        _id: {
          $in: categoryIds
        },
        isDeleted: false
      }).select("categoryName");
      // console.log(categories);
      return categories;
    } catch (error) {
      throw Error(error);
    }
  }
};
