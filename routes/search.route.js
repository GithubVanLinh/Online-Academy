"use strict";

const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search.controller");

router.get("/course", SearchController.getCoursesByName);
router.get("/byCategory", SearchController.getCoursesByCategory);
module.exports = router;
