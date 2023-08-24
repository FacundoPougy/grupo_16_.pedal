const path = require('path');
const express = require("express");
const userAdminController = require("../controllers/userAdminController.js");
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

// @GET /crear
router.get("/crear", userAdminController.getUserAdminCrear);

// @GET /editar
router.get("/:id/editar", userAdminController.getUserAdminEditar);

// @PUT /:id/eliminar
router.put("/:id/eliminar", userAdminController.userAdminDelete);

// @PUT /:id/actualizar
router.put("/:id/actualizar", [upload.any('image-update')], userAdminController.actualizar);

// @POST /
router.post("/", [upload.any('image')], userAdminController.postUserAdminCrear);


module.exports = router;