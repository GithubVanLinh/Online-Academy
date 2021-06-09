"use strict";
const SectionModel = require("../models/section.model");

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
  let section = null;
  try {
    if (await getByTitle(sectionInfo.title) === null) {
      section = await SectionModel.create({
        ...sectionInfo
      });
    }
  } catch (e) {
    console.log(e);
  }
  return section;
}


module.exports = {
  add,
  getByTitle
};