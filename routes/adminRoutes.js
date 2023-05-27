const express = require("express");
const adminController = require("../controllers/adminController.js");
const router = express.Router();

router.get("/", adminController.getAdmin);
router.get("/crear", adminController.getAdmin);
router.get("/editar", adminController.getAdmin);

module.exports = router;
