const fs = require("fs");
const path = require("path");

const model = {
  // Ruta del archivo JSON
  route: "../data/products.json",

  // Traer todos los productos
  findAll: function () {
    const productsJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );

    const products = JSON.parse(productsJSON);

    return products;
  },

  // Traer un producto según su ID
  findById: function (id) {
    const products = this.findAll();

    let searched = products.find((product) => product.id === id);

    if (!searched) {
      searched = null;
    }

    return searched;
  },

  // Eliminar un producto
  deleteById: function (id) {
    let products = this.findAll();

    products = products.filter((product) => product.id !== id);

    const productsJSON = JSON.stringify(products);

    fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

    return products;
  },

  // Eliminar soft un producto
  softDeleteById: function (id) {
    let products = this.findAll();

    const indice = products.findIndex(
      (productoActual) => productoActual.id === id
    );

    products[indice].deleted = true;

    // Convertimos nuestro array de JS a un array de JSON
    const productsJSON = JSON.stringify(products);

    // Guardamos este nuevo array de JSON en el archivo correspondiente
    fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

    return products;
  },

  updateById: function (id, newData) {
    // Buscamos el array de productos
    let products = this.findAll();

    // Con el findIndex, buscamos en qué indice del array de productos, está guardado el elemento buscado
    const indice = products.findIndex(
      (productoActual) => productoActual.id === id
    );

    // Actualizamos los datos del producto que corresponda, con los datos que nos pasaron por parámetros
    products[indice].name = newData.name;
    products[indice].description = newData.description;
    products[indice].stock = newData.stock;
    /*  products[indice].image = newData.image; */
    products[indice].price = newData.price;
    products[indice].category = newData.category;
    products[indice].colors = newData.colors;

    // Convertimos nuestro array de JS a un array de JSON
    const productsJSON = JSON.stringify(products);

    // Guardamos este nuevo array de JSON en el archivo correspondiente
    fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

    return products;
  },

  // Agregar un producto nuevo
  createOne: function (newProduct) {
    // Buscamos todos los productos
    let products = this.findAll();

    // Le damos el ID al producto nuevo
    newProduct.id = products[products.length - 1].id + 1;

    // Agregamos el producto nuevo al array original
    products.push(newProduct);

    // Convertimos a JSON el array
    const productsJSON = JSON.stringify(products);

    // Sobreescribimos el JSON
    fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
  },
};

module.exports = model;
