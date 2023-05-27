const path = require("path");

const controller = {
  getCarrito : (req, res) => {
      res.render('cart.ejs',{ title: 'Carrito' });
    },
};
module.exports = controller;
