"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategory);

module.exports = router;
