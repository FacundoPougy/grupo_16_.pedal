const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const model = {
  // Ruta del archivo JSON
  route: "../data/users.json",

  // Traer todos los usuarios
  findAll: function () {
    const usersJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );

    const users = JSON.parse(usersJSON);

    return users;
  },

  // Traer un usuario según su email
  findByEmail: function (email) {
    const users = this.findAll();

    let searched = users.find((user) => user.email === email);

    if (!searched) {
      searched = null;
    }

    return searched;
  },
  deleteByEmail: function (email) {
    let users = this.findAll();

    users = users.filter((user) => user.email !== email);

    const usersJSON = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

    return users;
  },
  softDeleteByEmail: function (email) {
    let users = this.findAll();

    const indice = users.findIndex(
      (usuarioActual) => usuarioActual.email === email
    );

    users[indice].deleted = true;

    // Convertimos nuestro array de JS a un array de JSON
    const usersJSON = JSON.stringify(users);

    // Guardamos este nuevo array de JSON en el archivo correspondiente
    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

    return users;
  },
  updateByEmail: function (email, newData) {
    // Buscamos el array de productos
    let users = this.findAll();

    // Con el findIndex, buscamos en qué indice del array de productos, está guardado el elemento buscado
    const indice = users.findIndex((usuarioActual) => usuarioActual.id === id);

    // Actualizamos los datos del producto que corresponda, con los datos que nos pasaron por parámetros
    users[indice].image = newData.image;

    // Convertimos nuestro array de JS a un array de JSON
    const usersJSON = JSON.stringify(users);

    // Guardamos este nuevo array de JSON en el archivo correspondiente
    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

    return users;
  },

  // Agregar un usuario nuevo
  createOne: function (newUser) {
    // Buscamos todos los usuarios
    let users = this.findAll();

    // Le damos el ID al usuario nuevo
    newUser.id = uuid.v4();

    // Agregamos el usuario nuevo al array original
    users.push(newUser);

    // Convertimos a JSON el array
    const usersJSON = JSON.stringify(users);

    // Sobreescribimos el JSON
    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
  },
};

module.exports = model;
