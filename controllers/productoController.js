const path = require("path");

const controller = {
  getDetalleDelProducto: (req, res) => {
    res.render("product-detail.ejs");
  },
};

module.exports = controller;
