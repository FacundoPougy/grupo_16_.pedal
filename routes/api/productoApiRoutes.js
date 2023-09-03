const express = require("express");
const apiControllers = require("../../controllers/api/productoApiControllers");

const router = express.Router();

//@GET - /api/
router.get("/", apiControllers.getAll);
//@GET - /api/product/:id
router.get("/:id", apiControllers.getProduct);

module.exports = router;