const bcrypt = require('bcrypt');
const userModel = require('../models/users');


const controller = {
  getRegister: (req, res) => {
    res.render('register', {
      title: 'Register'
    });
  },

  registerUser: (req, res) => {
    const user = req.body;
    //console.log(user);

    const newPassword = bcrypt.hashSync(user.password,12);

    user.password = newPassword;

    userModel.createOne(user);

    //res.send('Se registró el usuario'); PONER UN MENSAJE DE USUARIO REGISTRADO CON EXITO
    res.redirect('/');

},
};

module.exports = controller;