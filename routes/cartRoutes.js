const express = require("express");
const cartController = require("../controllers/cartController.js");
const router = express.Router();

router.get("/", cartController.getCarrito);

module.exports = router;
