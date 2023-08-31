const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const { User, ShoppingCart } = require("../database/models");

async function deleteUserRelated(user) {
  try {
    await ShoppingCart.destroy({
      where: {
        user_id: user.id,
      },
    });

    let userImagePath;
    if (user.image) {
      userImagePath = path.join(__dirname, "../public/", user.image);
      console.log(userImagePath);
      fs.unlink(userImagePath, (err) => {
        if (err) {
          console.error("Error deleting user image:", err);
        }
      });
    }

    console.log("related data deleted successfully", userImagePath);
  } catch (error) {
    console.error("Error deleting related data:", error);
    throw error;
  }
}

const controller = {
  getUserAdminEditar: async (req, res) => {
    try {
      const id = Number(req.params.id);

      const usuarioAMostrar = await User.findByPk(id);

      // Si el usuario no se encuentra (su id es inválido)
      if (!usuarioAMostrar) {
        return res.send("error de id");
      }

      const jsonString = JSON.stringify(usuarioAMostrar);

      res.render("user-edit.ejs", {
        title: "Editar usuario",
        usuario: JSON.parse(jsonString),
      });
    } catch (error) {
      // Manejo de errores
      console.error("Ha ocurrido un error:", error);
      res.status(500).send("Error en el servidor");
    }
  },

  getUserAdminCrear: (req, res) => {
    res.render("user-crear.ejs", {
      title: "Crear usuario",
    });
  },

  userAdminDelete: async (req, res) => {
    try {
      const id = Number(req.params.id);

      const usuarioAEliminar = await User.findByPk(id);

      if (!usuarioAEliminar) {
        return res.send("Usuario no encontrado");
      }

      await deleteUserRelated(usuarioAEliminar);

      await usuarioAEliminar.destroy({
        where: {
          id: usuarioAEliminar.id,
        },
      });

      res.status(200).redirect("/admin");
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
      res.status(500).send("Error en el servidor");
    }
  },

  actualizar: async (req, res) => {
    try {
      const validationsValues = validationResult(req);

      if (validationsValues.errors.length > 0) {
        return res.status(400);
      }

      const id = Number(req.params.id);
      const newInfo = req.body;
      const newImage =
        req.files.length > 0 ? "/images/users/" + req.files[0].filename : null; // Tomar solo la primera imagen
      const oldUser = await User.findByPk(id);

      const updatedUserData = {
        firstName: newInfo.firstName,
        lastName: newInfo.lastName,
        email: newInfo.email,
        password: bcrypt.hashSync(newInfo.password, 12),
        type: newInfo.type,
        image: newImage || oldUser.image, // Usar newImage si está definida, de lo contrario, mantener la imagen existente
      };

      await User.update(updatedUserData, {
        where: {
          id: id,
        },
      });

      // Borrar la imagen anterior
      if (newImage && oldUser.image) {
        try {
          const entirePath = path.join(__dirname, "../public/", oldUser.image);
          await fs.unlink(entirePath, (err) => {
            if (err) {
              console.error("Error deleting item image:", err);
            }
          });
        } catch (unlinkErr) {
          console.error("Error deleting item image:", unlinkErr);
          throw unlinkErr;
        }
      }

      res.redirect("/admin");
    } catch (error) {
      console.error("Error during user update:", error);
      res.status(500).send("Error durante la actualización.");
    }
  },

  postUserAdminCrear: async (req, res) => {
    try {
      const validationsValues = validationResult(req);

      if (validationsValues.errors.length > 0) {
        return res.status(400);
      }

      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        type: req.body.type,
        image: req.files[0]
          ? req.files.map((file) => "/images/users/" + file.filename)[0]
          : "/images/users/1692915094304-no-user.jpg",
      };

      await User.create(user);

      //Agregar un admin reddirect con alguna query varaible para indicar que se vea usuario
      res.status(200).redirect("/admin");
    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al crear el usuario.");
    }
  },
};

module.exports = controller;
