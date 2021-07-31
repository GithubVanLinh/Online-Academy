"use strict";
const CourseModel = require("../models/course.model");
const CategoryModel = require("../models/category.model");
const Config = require("../configs/constraints");
const escapeStringRegexp = require("escape-string-regexp");
const SEARCH_LIMIT = 5;

module.exports = {
  getCoursesByFilter: async (filter) => {
    const query = {};
    if (filter.keyword) {
      const keyword = escapeStringRegexp(filter.keyword);
      query.courseName = new RegExp(keyword, "i");
      query.status = Config.COURSE_STATUS.COMPLETED;
    }
    const options = {
      populate: [
        {
          path: "category",
          select: "categoryName"
        },
        {
          path: "courseLecturers",
          select: "fullName"
        }
      ],
      page: filter.page,
      limit: SEARCH_LIMIT
    };
    if (filter.sortBy) {
      if (filter.sortBy === "ratingDesc") {
        options.sort = { ratingPoint: "desc" };
      }
      if (filter.sortBy === "priceAsc") {
        options.sort = { price: "asc" };
      }
    }
    try {
      const result = await CourseModel.paginate(query, options);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  getCoursesByCate: async (filter) => {
    const cateQuery = {};
    if (filter.keyword) {
      const keyword = filter.keyword;
      cateQuery.categoryName = new RegExp(keyword, "gi");
    }
    const categoriesQuery = await CategoryModel.paginate(cateQuery, { select: ["_id"] });
    const cateIds = categoriesQuery.docs.reduce((result, cate) => [...result, cate._id], []);

    const query = {};
    query.category = { $in: cateIds };
    query.status = Config.COURSE_STATUS.COMPLETED;
    const options = {
      populate: [
        {
          path: "category",
          select: "categoryName"
        },
        {
          path: "courseLecturers",
          select: "fullName"
        }
      ],
      page: filter.page,
      limit: SEARCH_LIMIT
    };
    if (filter.sortBy) {
      if (filter.sortBy === "ratingDesc") {
        options.sort = { ratingPoint: "desc" };
      }
      if (filter.sortBy === "priceAsc") {
        options.sort = { price: "asc" };
      }
    }
    try {
      const result = await CourseModel.paginate(query, options);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  getCategoryByName: async (keyword) => {
    const pattern = `^${keyword}$`;
    try {
      const categories = await CategoryModel.find({ categoryName: { $regex: new RegExp(pattern, "i") } });
      return categories[0];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
