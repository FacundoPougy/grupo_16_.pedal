const path = require("path");
const {
  Product
} = require("../database/models");
const {
  Op
} = require("sequelize");

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
    let userData = req.session.user;

    try {
      const productos = await Product.findAll({
        where: {
          [Op.or]: [{
              name: {
                [Op.like]: `%${query}%`
              },
            },
            {
              description: {
                [Op.like]: `%${query}%`
              },
            },
          ],
        },
      });

      if (productos.length > 0) {
        return res.render("products", {
          title: "Tienda",
          productos,
          user: userData,
        });
      } else {
        return res.render("products", {
          title: "Sin resultados",
          productos,
          user: userData,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error en la búsqueda");
    }
  },

};

module.exports = controller;