const path = require("path");

const controller = {
  getLogin: (req, res) => {
    res.render('login',{ title: '.pedal' });
  },
};

module.exports = controller;
