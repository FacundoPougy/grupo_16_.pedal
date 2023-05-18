const path = require("path");

const controller = {
  getDetalleDelProducto: (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product-detail.html"));
  },
};

module.exports = controller;
