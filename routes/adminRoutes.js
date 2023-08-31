const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require("../controllers/adminController.js");
const createValidations = require('../middlewares/Validations/createProductsValidations');
const updateValidations = require('../middlewares/Validations/updateProductsValidations');

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
router.put("/:id/actualizar", [upload.any('image-update'), updateValidations.productChecks], adminController.actualizar);

// @PUT /deleteItems
router.put("/deleteItems", [upload.none()], adminController.deleteItems);

// @POST /
router.post("/", [upload.any('image'), createValidations.productChecks], adminController.postAdminCrear);

// @POST /image
router.post("/image", [upload.any('image-item')], adminController.postImage);

// @POST /deleteImage
router.post("/deleteImage", [upload.none()], adminController.deleteImage);

// @POST /:id/items
router.post("/:id/items", [upload.none()], adminController.postCrearItems);

module.exports = router;