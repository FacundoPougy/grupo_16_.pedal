const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');

//Carpetas mains y products para que busque
app.set('views', [
  path.join(__dirname, './views/main'),
  path.join(__dirname, './views/products')
]);

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
  console.log("Servidor en: http://localhost:" +PORT);
});
