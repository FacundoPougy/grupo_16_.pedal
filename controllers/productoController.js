const path = require("path");

const productModel = require("../models/products");

const controller = {
  // @GET /products
  getProductos: (req, res) => {
    const productos = productModel.showNotDeleted();

    res.render("products", {
      title: "Tienda",
      productos,
    });
  },

  // @GET /products/:id/detail
  getProductoDetalle: (req, res) => {
    const productos = productModel.findAll();

    // Agarramos el ID que nos pasaron por parámetro de ruta, y lo convertimos en number
    const id = Number(req.params.id);

    // Buscamos en el array de productos, el producto cuyo ID coincida con el que nos enviaron por params
    const productoAMostrar = productModel.findById(id);

    // Si el producto no se encuentra (su id es inválido)
    if (!productoAMostrar) {
      // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
      // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
      return res.send("error de id");
    }

    res.render("product-detail", {
      title: "Detalle",
      product: productoAMostrar,
      productos,
    });
  },
};

module.exports = controller;
