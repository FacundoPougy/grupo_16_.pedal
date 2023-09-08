const { User } = require("../../database/models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        raw: true,
      });

      const response = {
        count: users.length,
        users: users.map((user) => ({
          id: user.id,
          name: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: user.type,
          image: user.image,
          detail: `/api/users/${user.id}`,
        })),
      };

      res.json(response);
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      res.status(500).json({
        error: "Ha ocurrido un error al obtener todos los usuarios",
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "type"], // excluir campos sensibles
        },
      });

      if (!user) {
        res.status(404).json({
          error: "Usuario no encontrado",
        });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).json({
        error: "Ha ocurrido un error al obtener el usuario",
      });
    }
  },
};
