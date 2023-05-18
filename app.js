const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de directorio público
app.use(express.static(path.join(__dirname, "public")));

// Rutas
const homeRoutes = require("./routes/homeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const productoRoutes = require("./routes/productoRoutes");

//Uso de las rutas
app.use(homeRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/productos", productoRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log("Servidor en el puerto " + PORT);
});
