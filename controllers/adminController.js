const {
  Product
} = require('../database/models');

const {
  Item
} = require('../database/models');

const {
  ShoppingCart
} = require('../database/models');

const controller = {
  getAdmin: async (req, res) => {

    let bicisObj = await Product.findAll();

    res.render("admin.ejs", {
      title: "ADMIN",
      bicis: bicisObj,
    });
  },

  getAdminEditar: async (req, res) => {
    // Agarramos el ID que nos pasaron por parámetro de ruta, y lo convertimos en number
    const id = Number(req.params.id);
    // Buscamos en el array de productos, el producto cuyo ID coincida con el que nos enviaron por params
    const productoAMostrar = await Product.findByPk(id);

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

  getAdminCrear: (req, res) => {
    res.render("admin-crear.ejs", {
      title: "Crear",
    });
  },

  adminDelete: async (req, res) => {
    const id = Number(req.params.id);

    const itemsToDestroy = await Item.findAll({
      where: {
        product_id: id
      }
    });

    itemsToDestroy.forEach(async item => {
      await ShoppingCart.destroy({
        where: {
          item_id: item.id
        }
      });
    });

    await Item.destroy({
      where: {
        product_id: id
      }
    });

    await Product.destroy({
      where: {
        id: id
      }
    });

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
    let datos = req.body;

    datos.price = Number(datos.price);

    datos.image = req.files.map((file) => "/images/" + file.filename);

    productModel.createOne(datos);

    console.log(datos);
    res.redirect("/admin");
  },
};

module.exports = controller;