window.addEventListener("load", function () {
  const buttons = document.querySelector(".botones-color");
  const productImage = document.querySelector(".img-producto");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const color = this.getAttribute("data-color");
      const imagePath = "../../public/images/accesorios.jpg"; // Cambia esto a la ruta correcta
      productImage.src = imagePath;
    });
  });
});
