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
    const query = req.query.search;

    let searchedProduct = await Product.findOne({
      where: {
        name: { [Op.like]: query },
      },
    });
    if (searchedProduct) {
      return res.redirect(`/productos/${searchedProduct.id}/detalle`);
    }
  },
};

module.exports = controller;
