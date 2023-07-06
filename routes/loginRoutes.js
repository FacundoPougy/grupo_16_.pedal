const express = require("express");
const loginController = require("../controllers/loginController.js");
const router = express.Router();
const middlewares = require('../middlewares/authMiddlewares');

// @GET - /login
router.get('/', middlewares.allowUnsignedIn, loginController.getLogin);

// @POST - /login
router.post("/", loginController.loginUser);

module.exports = router;