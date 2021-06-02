const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search.controller");

router.get('/', SearchController.getCourses);

module.exports = router;
