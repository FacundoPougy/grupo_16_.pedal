const bcrypt = require('bcrypt');
const userModel = require('../models/users');

const controller = {
  getRegister: (req, res) => {
    res.render("register", {
      title: "Register",
    });
  },

  registerUser: (req, res) => {
    const user = req.body;

    const newPassword = bcrypt.hashSync(user.password, 12);

    user.password = newPassword;

    user.image = req.files.map((file) => "/images/" + file.filename);

    userModel.createOne(user);

    //res.send('Se registró el usuario'); PONER UN MENSAJE DE USUARIO REGISTRADO CON EXITO
    res.redirect("/");
  },
};

module.exports = controller;
