const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");

const {
  User
} = require('../database/models');

const controller = {

  getUserAdminEditar: async (req, res) => {

    try {
      const id = Number(req.params.id);

      const usuarioAMostrar = await User.findByPk(id);

      // Si el usuario no se encuentra (su id es inválido)
      if (!usuarioAMostrar) {
        return res.send("error de id");
      }

      const jsonString = JSON.stringify(usuarioAMostrar);

      res.render("user-edit.ejs", {
        title: "Editar usuario",
        usuario: JSON.parse(jsonString)
      });
    } catch (error) {
      // Manejo de errores
      console.error("Ha ocurrido un error:", error);
      res.status(500).send("Error en el servidor");
    }

  },

  getUserAdminCrear: (req, res) => {
    res.render("user-crear.ejs", {
      title: "Crear usuario",
    });
  },

  userAdminDelete: (req, res) => {
    console.log(req.params.id);
    res.send("Listo delete");
  },

  actualizar: (req, res) => {
    console.log(req.params.id);
    res.send("Listo Actualizar");
  },

  postUserAdminCrear: async (req, res) => {
    try {
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        type: req.body.type,
        image: req.files.map((file) => "/images/users/" + file.filename)[0]
      };

      await User.create(user);

      res.status(200).send("Usuario creado con éxito."); //Agregar un admin reddirect con alguna query varaible para indicar que se vea usuario

    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al crear el usuario.");
    }

  },

};

module.exports = controller;