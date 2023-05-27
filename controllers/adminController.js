const path = require("path");

const controller = {
  getAdmin: (req, res) => {
    res.render("admin.ejs", {
      title: "ADMIN"
    });
  },

  getAdminCrear: (req, res) => {
    res.render("admin-crear.ejs", {
      title: "Crear"
    });
  },


};

module.exports = controller;