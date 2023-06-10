const express = require("express");
const adminController = require("../controllers/adminController.js");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/products');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/", adminController.getAdmin);

router.get("/crear", adminController.getAdminCrear);


router.get("/:id/editar", adminController.getAdminEditar);

// @PUT /:id/eliminar SOFT DELETE
router.put("/:id/eliminar", adminController.adminSoftDelete);

// @PUT /:id/editarProducto
router.put("/:id/actualizar", adminController.actualizar);

module.exports = router;

// @POST /products
router.post("/", upload.any('img'), adminController.postAdminCrear);
//router.post('/', upload.any('img'), productControllers.postProduct);
