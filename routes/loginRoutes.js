const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();

router.get("/", loginController.getLogin);

module.exports = router;
