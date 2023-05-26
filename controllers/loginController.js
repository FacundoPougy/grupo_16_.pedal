const path = require("path");

const controller = {
  getLogin: (req, res) => {
    res.render('login',{ title: 'Login' });
  },
};

module.exports = controller;
