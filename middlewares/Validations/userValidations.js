const { body } = require("express-validator");
const { User } = require("../../database/models");

const acceptedExtensions = [".jpg", ".jpeg", ".png"];

const registerValidations = {
  registerValidation: [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre para el usuario!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El nombre debe tener al menos 2 caracteres"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un apellido!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El apellido debe tener al menos 2 caracteres"),

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
        if (duplicatedEmail) {
          throw new Error("Ese e-mail ya se encuentra en la base de datos");
        }
        return true;
      })
      .bail()
      .custom((value, { req }) => {
        let email = req.body.email;
        const regexEmail =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        let emailOk = regexEmail.test(email);

        if (!emailOk) {
          throw new Error("El e-mail es inválido");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes ingresar una contraseña!")
      .bail()
      .isLength({ min: 8 })
      .withMessage("la contraseña debe tener al menos 8 caracteres"),

    body("image").custom((value, { req }) => {
      const uploadedFiles = req.files;

      uploadedFiles.forEach((file) => {
        const fileExtension = file.originalname
          .substring(file.originalname.lastIndexOf("."))
          .toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`La extensión ${fileExtension} no está permitida.`);
        }
      });

      return true;
    }),
  ],
  editValidation: [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre para el usuario!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El nombre debe tener al menos 2 caracteres"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un apellido!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El apellido debe tener al menos 2 caracteres"),

    body("password").custom(async (value, { req }) => {
      let pw = req.body.password.trim();

      if (pw.length >= 1 && pw.length <= 8) {
        throw new Error("La contraseña debe tener 8 caracteres");
      }
    }),

    body("image").custom((value, { req }) => {
      const uploadedFiles = req.files;

      uploadedFiles.forEach((file) => {
        const fileExtension = file.originalname
          .substring(file.originalname.lastIndexOf("."))
          .toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`La extensión ${fileExtension} no está permitida.`);
        }
      });

      return true;
    }),
  ],
  createValidation: [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un nombre para el usuario!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El nombre debe tener al menos 2 caracteres"),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar un apellido!")
      .bail()
      .isLength({
        min: 2,
      })
      .withMessage("El apellido debe tener al menos 2 caracteres"),

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
        if (duplicatedEmail) {
          throw new Error("Ese e-mail ya se encuentra en la base de datos");
        }
        return true;
      })
      .bail()
      .custom((value, { req }) => {
        let email = req.body.email;
        const regexEmail =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        let emailOk = regexEmail.test(email);

        if (!emailOk) {
          throw new Error("El e-mail es inválido");
        }
        return true;
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes ingresar una contraseña!")
      .bail()
      .isLength({ min: 8 })
      .withMessage("la contraseña debe tener al menos 8 caracteres"),
    body("type").custom((value, { req }) => {
      const type = req.body.type;
      console.log(req.body.type);
      if (typeof type === "string") {
        if (type === "Usuario" || type === "Administrador") {
          return true;
        } else {
          throw new Error("El type no esta permitido");
        }
      } else {
        throw new Error("El type debe ser una cadena");
      }
    }),

    body("image").custom((value, { req }) => {
      const uploadedFiles = req.files;

      uploadedFiles.forEach((file) => {
        const fileExtension = file.originalname
          .substring(file.originalname.lastIndexOf("."))
          .toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`La extensión ${fileExtension} no está permitida.`);
        }
      });

      return true;
    }),
  ],
};

module.exports = registerValidations;
