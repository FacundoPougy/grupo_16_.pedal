const path = require("path");
const bcrypt = require('bcrypt');
const userModel = require('../models/users');

const controller = {

  getLogin: (req, res) => {
    const error = req.query.error; // Obtener el valor del parámetro "error"
    res.render('login', {
      title: 'Login',
      error: error
    });
  },

  loginUser: (req, res) => {
    const searchedUser = userModel.findByEmail(req.body.email);

    if (!searchedUser) {
      return res.redirect('/login?error=El mail o la contraseña son incorrectos');
    }

    const {
      password: hashedPw
    } = searchedUser;

    const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);
    
    if (isCorrect) {
      
      if (!!req.body.remember) {
        res.cookie('email', searchedUser.email, {
          maxAge: 1000 * 60 * 60 * 24 * 360 * 9999
        });
      }

      delete searchedUser.password;
      delete searchedUser.id;

      req.session.user = searchedUser;

      res.redirect('/#menu');

    } else {
      return res.redirect('/login?error=El mail o la contraseña son incorrectos');
    }
  },
};

module.exports = controller;