const express = require("express");
const adminController = require("../controllers/adminController.js");
const router = express.Router();

router.get("/", adminController.getAdmin);

router.get("/crear", adminController.getAdminCrear);
//router.post("/crear", upload.any('image'), productoController.postAdminCrear); 

//router.get("/editar", adminController.getAdminEditar);

router.get('/:id/editar', adminController.getAdminEditar);


module.exports = router;
