"use strict";
const CourseModel = require("../models/course.model");
const CategoryModel = require("../models/category.model");
const SEARCH_LIMIT = 5;

module.exports = {
  getCoursesByFilter: async (filter) => {
    const query = {};
    if (filter.keyword) {
      const keyword = filter.keyword;
      query.courseName = new RegExp(keyword, "gi");
    }
    const options = {
      populate: ["category"],
      page: filter.page,
      limit: SEARCH_LIMIT
    };
    if (filter.sortBy) {
      if (filter.sortBy == "ratingDesc") {
        options.sort = {ratingPoint: "desc"};
      }
      if (filter.sortBy == "priceAsc") {
        options.sort = {price: "asc"};
      }
    }
    let courses = [];
    try {
      const result = await CourseModel.paginate(query, options);
      courses = [...result.docs];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return courses;
  },

  getCoursesByCate: async (filter) => {
    const cateQuery = {};
    if (filter.keyword) {
      const keyword = filter.keyword;
      cateQuery.categoryName = new RegExp(keyword, "gi");
    }
    const categoriesQuery = await CategoryModel.paginate(cateQuery, {select: ["_id"]});
    const cateIds = categoriesQuery.docs.reduce((result, cate) => result = [...result, cate._id], []);

    const query = {};
    query.category = {$in: cateIds}
    const options = {
      populate: ["category"],
      page: filter.page,
      limit: SEARCH_LIMIT
    };
    if (filter.sortBy) {
      if (filter.sortBy == "ratingDesc") {
        options.sort = {ratingPoint: "desc"};
      }
      if (filter.sortBy == "priceAsc") {
        options.sort = {price: "asc"};
      }
    }
    let courses = [];

    try {
      const result = await CourseModel.paginate(query, options);
      courses = [...result.docs];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    return courses;
  },

  getCategoryByName: async (keyword) => {
    const pattern = `^${keyword}$`;
    const categories = await CategoryModel.find({categoryName: { $regex : new RegExp(pattern, "i")}});
    return categories[0];
  }
};
