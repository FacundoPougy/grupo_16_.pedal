const path = require("path");

const controller = {
  getIndex: (req, res) => {
    let userData = req.session.user;

    res.render('home', {
      title: '.pedal',
      user: userData
    });
  },
};

module.exports = controller;