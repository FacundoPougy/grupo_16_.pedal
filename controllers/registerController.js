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

    delete user.password;
    delete user.id;

    req.session.user = user;

    res.redirect('/#menu');
  },
};

module.exports = controller;
