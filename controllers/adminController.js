const path = require("path");

const productModel = require("../models/products");

const fs = require("fs");
const { log } = require("console");

const filePath = "data/products.json";

const data = fs.readFileSync(filePath, "utf8");

let bicisObj = {};

try {
  bicisObj = JSON.parse(data);
} catch (error) {
  console.error("Error al analizar el JSON:", error);
}

const controller = {
  getAdmin: (req, res) => {
    res.render("admin.ejs", {
      title: "ADMIN",
      bicis: bicisObj,
    });
  },

  getAdminEditar: (req, res) => {
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

    res.render("admin-edit.ejs", {
      title: "Editar",
      product: productoAMostrar,
    });
  },

  /*   postAdminCrear: (req, res) => {
    
  }, */

  getAdminCrear: (req, res) => {
    res.render("admin-crear.ejs", {
      title: "Crear",
    });
  },

  adminSoftDelete: (req, res) => {
    console.log("Llegue");

    const id = Number(req.params.id);

    //productModel.deleteById(id);
    productModel.softDeleteById(id);

    res.redirect("/admin");
  },
  actualizar: (req, res) => {
    //constantes
    const id = Number(req.params.id);
    const newData = req.body;

    //requerimos el updateById
    productModel.updateById(id, newData);

    //cuando termine nos redirija a /admin
    res.redirect("/admin");
    console.log("Se editó el id " + id);
  },

  postAdminCrear: (req, res) => {
    
  }
};

module.exports = controller;
