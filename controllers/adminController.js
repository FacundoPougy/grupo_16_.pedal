const path = require("path");

const fs = require('fs');

const filePath = 'data/products.json';

const data = fs.readFileSync(filePath, 'utf8');

let bicisObj = {};

try {
  bicisObj = JSON.parse(data);
} catch (error) {
  console.error('Error al analizar el JSON:', error);
}

const controller = {
  getAdmin: (req, res) => {
    res.render("admin.ejs", {
      title: "ADMIN",
      bicis: bicisObj
    });
  },

  getAdminCrear: (req, res) => {
    res.render("admin-crear.ejs", {
      title: "Crear"
    });
  },

  getAdminEditar: (req, res) => {
    res.render("admin-edit.ejs", {
      title: "Editar"
    });
  }, 


};

module.exports = controller;