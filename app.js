const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');

//Carpetas mains y products para que busque
app.set('views', [
  path.join(__dirname, './views/main'),
  path.join(__dirname, './views/products')
]);

// --- Middlewares ---
// Configuración de directorio público
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
app.use(cookieParser());

// Configuración del middleware de sesión
app.use(expressSession({
  secret: 'mi-secreto', // CAMBIAR ESTO!!!!!
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if (req.cookies.email) {
    const userModel = require('./models/users');

    const user = userModel.findByEmail(req.cookies.email);

    delete user.id;
    delete user.password;

    req.session.user = user;
    console.log(user + " user logueado");
  }

  next();
});


/* --- Routers --- */
const homeRoutes = require("./routes/homeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const productoRoutes = require("./routes/productoRoutes");
const adminRoutes = require("./routes/adminRoutes");

//Uso de las rutas
app.use(homeRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/productos", productoRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.render('404');
})

// Inicio del servidor
app.listen(PORT, () => {
  console.log("Servidor en: http://localhost:" + PORT);
});