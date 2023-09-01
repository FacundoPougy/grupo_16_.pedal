const fs = require('fs');
const path = require('path');
const {
  validationResult
} = require('express-validator');

const {
  Product,
  Item,
  ShoppingCart,
  User
} = require('../database/models');

async function deleteItemRelated(item) {
  try {
    await ShoppingCart.destroy({
      where: {
        item_id: item.id
      }
    });

    if (item.image) {
      const itemImagePath = path.join(__dirname, '../public/', item.image);
      fs.unlink(itemImagePath, err => {
        if (err) {
          console.error('Error deleting item image:', err);
        }
      });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}

async function createItems(itemList, productId) {
  for (const item of itemList) {
    item.product_id = productId;
    await Item.create(item);
  }
}

function deleteAllFiles(newImages, imagesFolderPath) {
  newImages.forEach(image => {
    const imagePathToDelete = path.join(imagesFolderPath, image.filename);

    fs.unlink(imagePathToDelete, err => {
      if (err) {
        console.error('Error deleting image:', err);
      } else {
        console.log('Image deleted successfully:', imagePathToDelete);
      }
    });
  });
}

function assignImagesToItems(itemsArray, newImages) {

  const itemImgFilenames = newImages
    .filter(file => file.fieldname === 'itemImg')
    .map(file => '/images/products/' + file.filename);


  if (itemsArray.length !== itemImgFilenames.length) {
    throw new Error('The length of itemsArray and itemImgFilenames must be the same.');
  }

  itemsArray.forEach((item, index) => {
    item.image = itemImgFilenames[index];
  });
}


const controller = {
  getAdmin: async (req, res) => {

    let bicisObj = await Product.findAll();
    let usersObj = await User.findAll();

    res.render("admin.ejs", {
      title: "ADMIN",
      bicis: bicisObj,
      usuarios: usersObj,
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
        await deleteItemRelated(item);
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
        throw error;
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

  actualizar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const validationsValues = validationResult(req);
      const currentItems = await Item.count({
        where: {
          product_id: id
        }
      });
      const newImages = req.files;
      const deleteItems = JSON.parse(req.body.deleteItems);
      const newItems = JSON.parse(req.body.items);

      if ((newItems.length + currentItems - deleteItems.length) <= 0) {
        validationsValues.errors.push({
          msg: 'Debe haber al menos un item.',
          path: 'items',
        });
      }

      if (validationsValues.errors.length > 0) {
        const imagesFolderPath = path.join(__dirname, '../public/images/products/');
        deleteAllFiles(newImages, imagesFolderPath);
        return res.status(400).json(validationsValues.errors);
      }

      const newInfo = req.body;
      const updatedImage = newImages.find(file => file.fieldname === 'updatedImage');
      const updatedImagePath = updatedImage ? "/images/products/" + updatedImage.filename : null;
      const oldProduct = await Product.findByPk(id);

      const updatedProductData = {
        name: newInfo.name,
        description: newInfo.description,
        category: newInfo.category,
        price: Number(newInfo.price),
        main_image: updatedImagePath || oldProduct.main_image // Usar updatedImagePath si está definida, de lo contrario, mantener la imagen existente
      };

      await Product.update(updatedProductData, {
        where: {
          id: id
        }
      });

      // Borrar la imagen anterior
      if (updatedImage && oldProduct.main_image) {
        try {
          const entirePath = path.join(__dirname, '../public/', oldProduct.main_image);
          await fs.unlink(entirePath, err => {
            if (err) {
              console.error('Error deleting item image:', err);
            }
          });
        } catch (unlinkErr) {
          console.error('Error deleting item image:', unlinkErr);
          throw unlinkErr;
        }
      }

      //Delete Items
      try {
        for (const id of deleteItems) {
          const item = await Item.findByPk(id);
          deleteItemRelated(item);
          await Item.destroy({
            where: {
              id: id
            }
          });
        }
      } catch (error) {
        console.error('Error deleting item');
        throw error;
      }

      assignImagesToItems(newItems, newImages);

      //Crear nuevos items
      try {
        await createItems(newItems, id);
      } catch (error) {
        console.error("An error occurred creating items:", error);
        throw error;
      }

      res.redirect("/admin");

    } catch (error) {
      console.error('Error during product update:', error);
      res.status(500).send('Error durante la actualización.');
    }
  },

  postAdminCrear: async (req, res) => {
    try {
      const validationsValues = validationResult(req);
      const newImages = req.files;

      if (validationsValues.errors.length > 0) {
        const imagesFolderPath = path.join(__dirname, '../public/images/products/');
        deleteAllFiles(newImages, imagesFolderPath);
        return res.status(400).json(validationsValues.errors);
      }

      let datos = req.body;
      datos.price = Number(datos.price);

      datos.main_image = "/images/products/" + newImages.find(file => file.fieldname === 'mainImage').filename;

      const createdProduct = await Product.create(datos);

      const productId = createdProduct.dataValues.id;

      const itemsArray = JSON.parse(req.body.items);

      assignImagesToItems(itemsArray, newImages);

      await createItems(itemsArray, productId);

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

  postCrearItems: async (req, res) => {
    try {
      const productId = Number(req.params.id);
      await createItems(JSON.parse(req.body.items), productId);
      res.status(200).send("Items created.");
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteItems: async (req, res) => {
    try {
      let item;
      for (const id of JSON.parse(req.body.items)) {
        item = await Item.findByPk(id);
        deleteItemRelated(item);
        await Item.destroy({
          where: {
            id: id
          }
        });
      }
      res.status(200).send("Items Deleted from DB.");

    } catch (error) {
      console.error('Error deleting items');
      res.status(500).send("An error occurred while deleting items.");
    }
  },
};

module.exports = controller;