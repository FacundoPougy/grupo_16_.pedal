const path = require("path");
const bcrypt = require('bcrypt');


const controller = {
  getLogin: (req, res) => {
    res.render('login',{ title: 'Login' });
  },
};

module.exports = controller;
