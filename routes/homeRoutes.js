const express = require("express");
const homeController = require("../controllers/homeController.js");
const router = express.Router();

router.get("/", homeController.getIndex);

router.get("/search", homeController.getSearch);

module.exports = router;
