const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./views/product-detail.html"));
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log('Servidor en el puerto '+PORT);
});