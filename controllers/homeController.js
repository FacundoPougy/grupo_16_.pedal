const path = require("path");

const controller = {
  getIndex: (req, res) => {
    res.render('home');
  },
};

module.exports = controller;
