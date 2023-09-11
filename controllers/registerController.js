const bcrypt = require("bcrypt");
const { User } = require("../database/models");
const { validationResult } = require("express-validator");

const controller = {
  getRegister: (req, res) => {
    const error = req.query.error;

    res.render("register", {
      title: "Register",
      error: error,
    });
  },

  registerUser: async (req, res) => {
    try {
      const searchedUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (searchedUser) {
        return res.redirect("/register?error=El email ya esta registrado");
      }
      const validationsValues = validationResult(req);

      if (validationsValues.errors.length > 0) {
        return res.status(400);
      }

      const user = req.body;
      const newPassword = bcrypt.hashSync(user.password, 12);

      user.password = newPassword;

      if (req.files[0]) {
        user.image = req.files.map(
          (file) => "/images/users/" + file.filename
        )[0];
      } else {
        /* arreglando ruta */
        user.image = "/images/users/1692915094304-no-user.jpg";
      }

      user.type = "user";

      await User.create(user);

      delete user.password;
      delete user.id;

      req.session.user = user;

      res.redirect("/#menu");
    } catch (error) {
      res.status(500).send("Hubo un error al registrarse");
    }
  },
};

module.exports = controller;
