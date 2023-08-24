const bcrypt = require("bcrypt");
const { User } = require("../database/models");

const controller = {
  getRegister: (req, res) => {
    res.render("register", {
      title: "Register",
    });
  },

  registerUser: async (req, res) => {
    const user = req.body;
    const newPassword = bcrypt.hashSync(user.password, 12);

    user.password = newPassword;

    user.image = req.files.map((file) => "/images/users/" + file.filename)[0];

    user.type = "user";

    await User.create(user);

    delete user.password;
    delete user.id;

    req.session.user = user;

    res.redirect("/#menu");
  },
};

module.exports = controller;
