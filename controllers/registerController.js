const bcrypt = require("bcrypt");
const { User } = require("../database/models");
const { validationResult } = require("express-validator");

const controller = {
  getRegister: (req, res) => {
    res.render("register", {
      title: "Register",
    });
  },

  registerUser: async (req, res) => {
    try {
      const validationsValues = validationResult(req);

      console.log(validationsValues.errors.length);

      if (validationsValues.errors.length > 0) {
        return res
          .status(400)
          .json(validationsValues.errors + validationsValues.errors.length);
      }
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
    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al crear el producto");
    }
  },
};

module.exports = controller;
