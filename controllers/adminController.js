const path = require("path");

const controller = {
  getAdmin: (req, res) => {
    res.render("admin.ejs", {
      title: "ADMIN"
    });
  },
};

module.exports = controller;