const form = document.getElementById("form-product");
const nombre = document.querySelector("#firstName");
const apellido = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const image = document.querySelector("#image");
const submitBtn = document.querySelector("#crear-product");

const checkErrors = () => {
  let errorWarning = Array.from(document.querySelectorAll(".error"));

  /* si saltan errores al usuario, se guardan en el array "errors" */
  let errors = [];

  errorWarning.forEach((error) => {
    if (error.innerHTML !== "") {
      errors.push(error.innerHTML);
    } else {
    }
  });

  /* si existen errores, se deshabilita el btn de submit */
  if (errors.length > 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};
/* ====== NOMBRE ======*/
nombre.onchange = (e) => {
  const length = e.target.value.length;

  if (length < 2) {
    nombre.nextElementSibling.innerHTML =
      "El nombre debe tener al menos 2 caracteres";
  } else {
    nombre.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== APELLIDO ======*/

apellido.onchange = (e) => {
  const length = e.target.value.length;

  if (length < 2) {
    apellido.nextElementSibling.innerHTML =
      "El apellido debe tener al menos 2 caracteres";
  } else {
    apellido.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

/* ====== CONTRASEÑA ======*/

password.oninput = (e) => {
  const length = e.target.value.length;
  const pwValue = e.target.value;

  const regexPw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const pwCorrect = regexPw.test(pwValue);

  if (!pwCorrect) {
    password.nextElementSibling.innerHTML =
      "La contraseña debe tener al menos una mayúscula y un número";
  } else {
    password.nextElementSibling.innerHTML = "";
  }

  if (length < 8) {
    password.nextElementSibling.innerHTML =
      "La contraseña debe tener al menos 8 caracteres";
  }

  checkErrors();
};

/* ====== IMAGEN ======*/

image.onchange = (e) => {
  const imageTypeAccepted = ["jpg", "png", "jpeg", "gif"];
  const imageSelected = image.files[0];
  const imageType = image.files[0].name.split(".").pop().toLowerCase();

  if (imageSelected) {
    if (!imageTypeAccepted.includes(imageType)) {
      image.nextElementSibling.innerHTML = "El tipo de archivo es inválido";
    } else {
      image.nextElementSibling.innerHTML = "";
    }
  }
  checkErrors();
};

/* ====== CHECKEAMOS QUE NO SE PUEDAN MANDAR INPUTS VACÍOS ======*/

form.addEventListener("submit", function (event) {
  if (nombre.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de nombre"
    );
  } else if (apellido.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de apellido"
    );
  } else if (email.value.length === 0) {
    event.preventDefault();
    console.log(
      "se frenó la ejecucion del submit, debido a fallas en el campo de email"
    );
  }
});
