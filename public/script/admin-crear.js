const overlay = document.getElementById('overlay');
const toggleButton = document.getElementById('toggle-button');
const addButton = document.getElementById("add-item-button");
const itemList = document.getElementById("item-list");


function hideItemsForm(overlay, toggleButton) {
    overlay.style.display = 'none';
    toggleButton.innerText = "Agregar un item";
    toggleButton.style.width = '20vw';
}

function showItemsForm(overlay, toggleButton) {
    overlay.style.display = 'block';
    toggleButton.innerText = "Cancelar";
    toggleButton.style.width = '12vw';
}

toggleButton.addEventListener('click', () => {
    if (overlay.style.display === 'none') {
        showItemsForm(overlay, toggleButton);
    } else {
        hideItemsForm(overlay, toggleButton);
    }
});

addButton.addEventListener("click", function (event) {
    console.log("test");

    const imageInput = document.getElementById("image-item");
    const colorInput = document.getElementById("color");
    const stockInput = document.getElementById("stock");

    const imageValue = imageInput.value;
    const colorValue = colorInput.value;
    const stockValue = stockInput.value;

    console.log(imageValue);

    if (imageValue && colorValue && stockValue) {
        const newItem = document.createElement("li");
        newItem.textContent = `Imagen: ${imageValue}, Color: ${colorValue}, Stock: ${stockValue}`;
        itemList.appendChild(newItem);

        //Limpiar los campos del formulario
        imageInput.value = "";
        colorInput.value = "";
        stockInput.value = "";

        //Ocultar formulario
        hideItemsForm(overlay, toggleButton);
    } else {
        alert("Por favor, complete todos los campos.");
    }
});


document.getElementById("form-product").addEventListener("submit", async function (event) {
   
//VALIDACIONES

});