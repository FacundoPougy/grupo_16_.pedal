const path = require("path");

const controller = {
  getDetalleDelProducto: (req, res) => {
    res.render("product-detail.ejs",{title: "Detalle"});
  },
  getProductos: (req, res) => {
    res.render("products",{title: "Tienda"});
  },
};

module.exports = controller;
