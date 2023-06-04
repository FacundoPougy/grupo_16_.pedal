const express = require("express");
const adminController = require("../controllers/adminController.js");
const router = express.Router();

router.get("/", adminController.getAdmin);

router.get("/crear", adminController.getAdminCrear);

router.get('/:id/editar', adminController.getAdminEditar);

// @PUT /:id/eliminar SOFT DELETE
router.put('/:id/eliminar', adminController.adminSoftDelete);


module.exports = router;


//router.post("/crear", upload.any('image'), productoController.postAdminCrear); 

//router.get("/editar", adminController.getAdminEditar);
