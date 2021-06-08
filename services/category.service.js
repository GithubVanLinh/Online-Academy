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

      const enrollments = await enrollmentModel
        .find({
          registeredTime: {
            $gte: startDate
          }
        })
        .populate({
          path: "courseId",
          select: "category"
        });
      // console.log(enrollment);

      const categoryIds = enrollments
        .map((e) => e.courseId.category)
        // remove duplicate
        .filter((id, index, arr) => arr.indexOf(id) === index);
      // console.log(categoryIds);

      const categories = await categoryModel
        .find({
          _id: {
            $in: categoryIds
          },
          isDeleted: false
        })
        .select("categoryName");
      // console.log(categories);
      return categories;
    } catch (error) {
      throw Error(error);
    }
  },

  createCategory: async (categoryInfo) => {
    return await mCreateCategory(categoryInfo);
  },

  deleteCategoryByCategoryId: async (categoryId) =>{
    const res = await mDeleteCategoryByCategoryId(categoryId);
    if (res) {
      return true;
    } else {
      return false;
    }
  },

  updateCategoryByCategoryId: async (categoryId, categoryInfo) => {
    return await mUpdateCategoryByCategoryId(categoryId, categoryInfo);
  }
};

/**
 * create category
 * @param {object} category category info
 * @return {Promise<object>}
 */
async function mCreateCategory(category) {
  const valid = await mCheckCategory(category);
  if (valid) {
    const resl = await mAddCategoryToDatabase(category);
    return resl;
  } else {
    return null;
  }
}

/**
 * add Category to database
 * @param {object} category valid category
 * @return {Promise<object>}
 */
async function mAddCategoryToDatabase(category) {
  const res = await categoryModel.create(category);
  return res;
}

/**
 * check if category is valid
 * @param {object} category category need check
 * @return {Promise<bool>} 
 */
async function mCheckCategory(category) {
  const res = await categoryModel.find({
    categoryName: category.categoryName,
    level: category.level,
    isDeleted: false
  });
  console.log("resl", res);
  if (!res || res.length==0) {
    return true;
  }
  return false;
}

/**
 * deleteCategory by category id
 * @param {string} categoryId category id
 * @return {Promise<object>}
 */
async function mDeleteCategoryByCategoryId(categoryId) {
  const res = await categoryModel.findByIdAndUpdate(categoryId, {
    isDeleted: true
  });
  return res;
}

/**
 * update category
 * @param {string} categoryId id
 * @param {object} categoryInfo category
 */
async function mUpdateCategoryByCategoryId(categoryId, categoryInfo) {
  const valid = await mCheckValidCategory(categoryInfo);
  console.log("valid", valid);
  if (valid) {
    return await mUpdateCategory(categoryId, categoryInfo)
  } else {
    return null;
  }
}

/**
 * check if valid category
 * @param {object} categoryInfo categoryName, level
 */
async function mCheckValidCategory(categoryInfo) {
  const {categoryName, level} = categoryInfo;
  const categories = await categoryModel.find({
    categoryName: categoryName,
    level: level
  });

  console.log("categories", categories);
  if (categories && categories.length > 0){
    return false;
  } else {
    return true;
  }
}

/**
 * update valid category
 * @param {string} categoryId id
 * @param {object} categoryInfo updateinfo
 */
async function mUpdateCategory(categoryId, categoryInfo){
  const res = await categoryModel.findByIdAndUpdate(categoryId, {...categoryInfo,
  updatedDate: Date.now()});
  return {...res, ...categoryInfo, updatedAt: Date.now()};
}