const path = require("path");
const { Product } = require("../database/models");
const { Op } = require("sequelize");

const controller = {
  getIndex: (req, res) => {
    let userData = req.session.user;

    res.render("home", {
      title: ".pedal",
      user: userData,
    });
  },
  getSearch: async (req, res) => {
    /* Obtenemos el nombre del producto */
    const query = req.query.search;

    /* Comparamos el nombre requerido por el cliente, con los de nuestra base de datos */
    let searchedProduct = await Product.findOne({
      where: {
        name: { [Op.like]: query },
      },
    });
    /* Si se encuentra un resultado, se redirige al cliente al detalle del producto requerido */
    if (searchedProduct) {
      return res.redirect(`/productos/${searchedProduct.id}/detalle`);
    }
  },
};

module.exports = controller;
