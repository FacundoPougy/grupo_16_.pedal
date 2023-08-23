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

// @GET /
router.get("/", adminController.getAdmin);

// @GET /crear
router.get("/crear", adminController.getAdminCrear);

// @GET /editar
router.get("/:id/editar", adminController.getAdminEditar);

// @PUT /:id/eliminar
router.put("/:id/eliminar", adminController.adminDelete);

// @PUT /:id/actualizar
router.put("/:id/actualizar", [upload.any('image-update')], adminController.actualizar);

// @PUT /deleteItems
router.put("/deleteItems", [upload.none()], adminController.deleteItems);

// @POST /
router.post("/", [upload.any('image')], adminController.postAdminCrear);

// @POST /image
router.post("/image", [upload.any('image-item')], adminController.postImage);

// @POST /deleteImage
router.post("/deleteImage", [upload.none()], adminController.deleteImage);

// @POST /:id/items
router.post("/:id/items", [upload.none()], adminController.postCrearItems);

module.exports = router;