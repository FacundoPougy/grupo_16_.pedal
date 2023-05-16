const express = require("express");
const productoController = require("../controllers/productoController.js");
const router = express.Router();

router.get("/detalle-del-producto", productoController.getDetalleDelProducto);

module.exports = router;
