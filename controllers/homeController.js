const path = require("path");

const controller = {
  getIndex: (req, res) => {
    res.render('home',{ title: '.pedal' });
  },
};

module.exports = controller;
