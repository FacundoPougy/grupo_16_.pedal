const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');


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

// el middleware CORS para permitir solicitudes entre dominios.
app.use(cors());

// Configuración del middleware de sesión
app.use(expressSession({
  secret: 'mi-secreto', // CAMBIAR ESTO!!!!!
  resave: false,
  saveUninitialized: false
}));

app.use(async (req, res, next) => {
  if (req.cookies.email) {
    const {
      User
    } = require("./database/models");

    try {
      const searchedUser = await User.findOne({
        where: {
          email: req.cookies.email
        },
      });
      if (!searchedUser) {
        // return res.redirect(
        //   "/login?error=El mail o la contraseña son incorrectos"
        // );
        console.error("Usuario no encontrado");

      }

      console.log(searchedUser);

      delete searchedUser.id;
      delete searchedUser.password;

      req.session.user = searchedUser;
      console.log(searchedUser + " user logueado");

    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      // return res.redirect("/login?error=" + error);
    }

  }

  next();
});


/* --- Routers --- */
const homeRoutes = require("./routes/homeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const productoRoutes = require("./routes/productoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes")
const userAdminRoutes = require("./routes/userAdminRoutes")

/* --- API Routers --- */
const userApiRoutes = require("./routes/api/userApiRoutes")
const productoApiRoutes = require("./routes/api/productoApiRoutes")


//Uso de las rutas
app.use(homeRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/productos", productoRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes)
app.use("/admin-user", userAdminRoutes)

//REST API ENDPOINTS
app.use('/api/products', productoApiRoutes);
app.use('/api/users', userApiRoutes);


app.use((req, res) => {
  res.render('404');
})

// Inicio del servidor
app.listen(PORT, () => {
  console.log("Servidor en: http://localhost:" + PORT);
});