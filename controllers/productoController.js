const path = require("path");

const productModel = require('../models/product');

const controller = {

  // @GET /products 
  getProductos: (req, res) => {
    const productos = productModel.findAll();

    res.render('products', {
      title: 'Tienda',
      productos
    });
  },

  getDetalleDelProducto: (req, res) => {
    res.render("product-detail.ejs", {
      title: "Detalle"
    });
  },

};

module.exports = controller;