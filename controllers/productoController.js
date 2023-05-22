const path = require("path");

const controller = {
  getDetalleDelProducto: (req, res) => {
    res.render("product-detail.ejs");
  },
  getProductos: (req, res) => {
    res.render("products");
  },
};

module.exports = controller;
