"use strict";
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const SearchController = require("../controllers/search.controller");

router.get("/", SearchController.getCourses);

module.exports = router;
