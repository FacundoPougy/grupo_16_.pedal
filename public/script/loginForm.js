window.onload = function () {
  const form = document.getElementById("form");
  const email = document.querySelector("#correo");
  const password = document.querySelector("#contraseña");
  const error = document.querySelectorAll(".error");
  const submitBtn = document.getElementById("submitBtn");
  form.addEventListener("submit", (e) => {
    console.log("hola");

    let errors = [];

    if (email.value === "" || email.value === null) {
      errors.push("Email invalido");
      email.nextElementSibling.innerHTML = "Email es requerido";
    } else if (email.value.length < 6) {
      errors.push("Email menor a 6 caracteres");
      email.nextElementSibling.innerHTML =
        "El email debe ser mayor a 6 caracteres";
    }

    if (password.value === "" || password.value === null) {
      errors.push("Password invalido");
      password.nextElementSibling.innerHTML = "Contraseña es requerida";
    } else if (password.value.length < 8) {
      errors.push("pw menor a 8 caracteres");
      password.nextElementSibling.innerHTML =
        "Contraseña debe ser mayor a 8 caracteres";
    }

    if (errors.length > 0) {
      e.preventDefault();
    }
  });
};
