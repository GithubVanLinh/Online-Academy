"use strict";
const SectionModel = require("../models/section.model");

/**
 *
 * @param {string} sectionId
 * @return {Promise<null>}
 */
async function getById(sectionId) {
  let section = null;
  try {
    section = await SectionModel.findById(sectionId).exec();
  } catch (e) {
    console.error(e);
  }
  return section;
}

/**
 *
 * @param {string} title
 * @return {Promise<null>}
 */
async function getByTitle(title) {
  let section = null;
  try {
    section = await SectionModel.findOne({
      title: title
    }).exec();
  } catch (e) {
    console.error(e);
  }
  return section;
}

/**
 *
 * @param {string} sectionInfo
 * @return {Promise<object>}
 */
async function add(sectionInfo) {
  try {
    const section = await SectionModel.create({
      ...sectionInfo
    });
    return section;
  } catch (e) {
    throw Error(e);
  }
}

/**
 *
 * @param {string} sectionId
 * @return {Promise<void>}
 */
async function modifyUpdatedTime(sectionId) {
  try {
    await SectionModel.findByIdAndUpdate(sectionId, {
      updatedAt: Date.now()
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * detele many section
 * @param {string} courseId course id
 * @return {Promise<number>}
 */
 async function mRemoveSectionsByCourseId(courseId) {
  const filter = {
    courseId: courseId
  };
  const updateData = {
    isDeleted: true
  };
  const res = await SectionModel.updateMany(filter, updateData);
  return res;
}
module.exports = {
  add,
  getByTitle,
  getById,
  modifyUpdatedTime,
  mRemoveSectionsByCourseId
};