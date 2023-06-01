const express = require("express");
const productoController = require("../controllers/productoController.js");
const router = express.Router();


// @GET /productos 
router.get("/", productoController.getProductos);


router.get("/detalle-del-producto", productoController.getDetalleDelProducto);

module.exports = router;

























/*

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


// @GET /products 
router.get('/', productControllers.getProducts);

// @POST /products
router.post('/', upload.any('img'), productControllers.postProduct);

// @GET /products/create
router.get('/create', productControllers.getCreate);

// @GET /products/:id/detail ---> /products/5/detail
router.get('/:id/detail', productControllers.getProductDetail);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', productControllers.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/update', productControllers.getUpdate);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/update', productControllers.updateProduct);

// @GET /products/cart
router.get('/cart', productControllers.getCart);

*/