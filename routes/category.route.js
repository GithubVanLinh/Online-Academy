"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const paramsCheck = require("../middlewares/paramscheck.mdw");
const validator = require("../middlewares/validator.mdw");

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategory);
router.post(
  "/",
  validator.validateRequestBody("category"),
  categoryController.createCategory
);
router.get(
  "/:categoryId",
  paramsCheck.checkCategoryId,
  categoryController.getCategoryByCategoryId
);
router.delete(
  "/:categoryId",
  paramsCheck.checkCategoryId,
  categoryController.deleteCategoryByCategoryId
);

router.patch(
  "/:categoryId",
  paramsCheck.checkCategoryId,
  validator.validateRequestBody("category"),
  categoryController.updateCategoryByCategoryId
)
module.exports = router;
