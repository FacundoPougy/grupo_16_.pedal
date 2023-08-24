const fs = require('fs');
const path = require('path');

const {
  User
} = require('../database/models');

const controller = {

  getUserAdminEditar: async (req, res) => {
    res.render("user-edit.ejs", {
      title: "Editar usuario",
    });
  },

  getUserAdminCrear: (req, res) => {
    res.render("user-crear.ejs", {
      title: "Crear usuario",
    });
  },

  userAdminDelete: (req, res) => {
    console.log(req.params.id);
  },

  actualizar: (req, res) => {
    console.log(req.params.id);
  },

  postUserAdminCrear: (req, res) => {
    console.log(req.params.id);
  },

};

module.exports = controller;