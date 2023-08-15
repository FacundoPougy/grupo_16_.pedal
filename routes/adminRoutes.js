const path = require('path');
const express = require("express");
const adminController = require("../controllers/adminController.js");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products/');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage
});

router.get("/", adminController.getAdmin);

router.get("/crear", adminController.getAdminCrear);

router.get("/:id/editar", adminController.getAdminEditar);

// @PUT /:id/eliminar
router.put("/:id/eliminar", adminController.adminDelete);

// @PUT /:id/editarProducto
router.put("/:id/actualizar", adminController.actualizar);

// @POST /
router.post("/", [upload.any('image')], adminController.postAdminCrear);

router.post("/image", [upload.any('image-item')], adminController.postImage);

router.post("/deleteImage", [upload.none()], adminController.deleteImage);

module.exports = router;