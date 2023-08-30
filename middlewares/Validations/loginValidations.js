const { body } = require("express-validator");
const { User } = require("../../database/models");

const loginValidations = {
  loginCheck: [
    body("email")
      .notEmpty()
      .withMessage("Debes ingresar tu e-mail!")
      .bail()
      .trim()
      .isEmail()
      .withMessage("El e-mail es inválido")
      .bail()
      .custom(async (value, { req }) => {
        let duplicatedEmail = await User.findOne({
          where: { email: req.body.email },
        });
        if (!duplicatedEmail) {
          throw new Error("El email no se encuentra en la base de datos");
        }
        return true;
      }),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña!"),
  ],
};

module.exports = loginValidations;
