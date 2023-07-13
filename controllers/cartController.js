const path = require("path");

const controller = {
  getCarrito: (req, res) => {
    let userData = req.session.user;

    res.render('cart.ejs', {
      title: 'Carrito',
      user: userData
    });
  },
};
module.exports = controller;