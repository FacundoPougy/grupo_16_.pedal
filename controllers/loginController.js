const path = require("path");

const controller = {
  getLogin: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../views/login.html")
    ); /* falta que existe el html de login, pero esta bien linkeado */
  },
};

module.exports = controller;
