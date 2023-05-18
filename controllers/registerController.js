const path = require("path");

const controller = {
  getRegister: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../views/register.html")
    ); /* falta que existe el html de register, pero esta bien linkeado */
  },
};

module.exports = controller;
