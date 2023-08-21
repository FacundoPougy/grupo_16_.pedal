const fs = require('fs');
const path = require('path');

const {
  Product,
  Item,
  ShoppingCart
} = require('../database/models');

async function deleteItemAndRelated(item) {
  try {
    await ShoppingCart.destroy({
      where: {
        item_id: item.id
      }
    });

    if (item.image) {
      const itemImagePath = path.join(__dirname, '../public/', item.image);
      console.log(itemImagePath);
      fs.unlink(itemImagePath, err => {
        if (err) {
          console.error('Error deleting item image:', err);
        }
      });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

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
    const productoAMostrar = await Product.findByPk(id, {
      include: 'items',
      nest: true,
    });

    // Si el producto no se encuentra (su id es inválido)
    if (!productoAMostrar) {
      // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
      // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
      return res.send("error de id");
    }

    const jsonString = JSON.stringify(productoAMostrar);

    res.render("admin-edit.ejs", {
      title: "Editar",
      product: productoAMostrar,
      items: JSON.parse(jsonString).items,
    });
  },

  getAdminCrear: (req, res) => {
    res.render("admin-crear.ejs", {
      title: "Crear",
    });
  },

  adminDelete: async (req, res) => {
    const id = Number(req.params.id);

    try {
      // Encontrar y eliminar items relacionados
      const itemsToDestroy = await Item.findAll({
        where: {
          product_id: id
        }
      });

      // Iterar y eliminar items en el shopping cart y sus imágenes
      for (const item of itemsToDestroy) {
        await deleteItemAndRelated(item);
      }

      // Eliminar los items
      await Item.destroy({
        where: {
          product_id: id
        }
      });

      // Encontrar el producto. Debería ser siempre uno solo.
      const productToDelete = await Product.findOne({
        where: {
          id: id
        }
      });

      // Eliminar imagen del producto
      try {
        if (productToDelete.main_image) {
          const productImagePath = path.join(__dirname, '../public/', productToDelete.main_image);
          fs.unlink(productImagePath, err => {
            if (err) {
              console.error('Error deleting product image:', err);
            }
          });
        }
      } catch (error) {
        console.error('Error deleting product image:', error);
      }

      // Eliminar el producto
      await Product.destroy({
        where: {
          id: id
        }
      });

      // Redirigir después de eliminar
      res.redirect("/admin");
    } catch (error) {
      console.error('Error deleting product and related items:', error);
      // Manejar el error
      res.status(500).send('Internal Server Error');
    }
  },

  actualizar: (req, res) => {
    //constantes
    const id = Number(req.params.id);
    const newData = req.body;

    console.log("Se editó el id " + id);


    res.redirect("/admin");
  },

  postAdminCrear: async (req, res) => {
    try {
      let datos = JSON.parse(req.body.data);
      datos.price = Number(datos.price);
      datos.main_image = req.files.map((file) => "/images/products/" + file.filename)[0]; // Tomar solo la primer imagen

      const createdProduct = await Product.create(datos);

      const productId = createdProduct.dataValues.id;

      for (const item of JSON.parse(req.body.items)) {
        item.product_id = productId;
        await Item.create(item);
      }

      res.status(200).send("Producto cargado con éxito.");

    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al crear el producto");
    }
  },

  postImage: (req, res) => {
    res.status(200).send(req.files.map((file) => "/images/products/" + file.filename)[0]);
  },

  deleteImage: async (req, res) => {

    for (const item of JSON.parse(req.body.items)) {
      if (item.image) {
        const itemImagePath = path.join(__dirname, '../public/', item.image);
        fs.unlink(itemImagePath, err => {
          if (err) {
            console.error('Error deleting item image:', err);
          }
        });
      }
    }

    res.status(200).send("Item deleted.");
  },

};

module.exports = controller;