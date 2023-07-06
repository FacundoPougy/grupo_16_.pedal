const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();
const middlewares = require('../middlewares/authMiddlewares');

// @GET - /login
router.get('/', middlewares.allowUnsignedIn, loginController.getLogin);

// @GET - /login
router.get("/", loginController.getLogin);

module.exports = router;
