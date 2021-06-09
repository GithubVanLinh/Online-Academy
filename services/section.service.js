"use strict";
const SectionModel = require("../models/section.model");

/**
 *
 * @param {string} courseId
 * @param {string} sectionInfo
 * @return {Promise<object>}
 */
const add = async (courseId, sectionInfo) => {
  let section = null;
  try {
    section = await SectionModel.create({
      courseId, ...sectionInfo
    });
  } catch (e) {
    console.log(e);
  }
  return section;
};



module.exports = {
  add: add
}