const path = require("path");

const { Product } = require("../database/models");
const { Item } = require("../database/models");
const { log } = require("console");

const controller = {
  // @GET /products
  getProductos: async (req, res) => {
    const productos = await Product.findAll();
    //console.log(productos);
    let userData = req.session.user;

    res.render("products", {
      title: "Tienda",
      productos,
      user: userData,
    });
  },

  // @GET /products/:id/detail
  getProductoDetalle: async (req, res) => {
    const productos = await Product.findAll();

    // Agarramos el ID que nos pasaron por parámetro de ruta, y lo convertimos en number
    const id = Number(req.params.id);

    // Buscamos en el array de productos, el producto cuyo ID coincida con el que nos enviaron por params
    const productoAMostrar = await Product.findByPk(id, {
      include: "items",
    });

    // Si el producto no se encuentra (su id es inválido)
    if (!productoAMostrar) {
      // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
      // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
      return res.send("error de id");
    }
    let userData = req.session.user;

    res.render("product-detail", {
      title: "Detalle",
      product: productoAMostrar,
      productos,
      user: userData,
    });
  },
};

module.exports = controller;
