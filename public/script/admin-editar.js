window.onload = function () {

    function hideItemsForm(overlay, toggleButton) {
        overlay.style.display = 'none';
        toggleButton.innerText = "Agregar un item";
        toggleButton.style.width = '20vw';
    }

    function showItemsForm(overlay, toggleButton) {
        overlay.style.display = 'block';
        toggleButton.innerText = "Cancelar";
        toggleButton.style.width = '12vw';
        const itemsErrorElement = document.getElementById("items-error");
        itemsErrorElement.textContent = "";
    }

    function showItem(color, stock, imagen) {
        // Obtén una referencia al contenedor de productos existentes
        var productosContainer = document.getElementById("items-container");

        // Crea el artículo de productos existentes
        var article = document.createElement("article");
        article.className = "productos-existentes";

        // Crea la imagen del producto
        const imageUrl = URL.createObjectURL(imagen);
        var img = document.createElement("img");
        img.id = "img-n" + itemList.length;
        img.className = "img-producto";
        img.src = imageUrl;
        img.alt = "Bicicleta";

        // Crea el contenedor de contenido de productos existentes
        var contentDiv = document.createElement("div");
        contentDiv.className = "productos-existentes-content";

        // Crea los elementos de párrafo para color y stock
        var colorParagraph = document.createElement("p");
        colorParagraph.textContent = "Color: " + color;
        var stockParagraph = document.createElement("p");
        stockParagraph.textContent = "Stock: " + stock;

        // Agrega los párrafos al contenedor de contenido
        contentDiv.appendChild(colorParagraph);
        contentDiv.appendChild(stockParagraph);

        // Crea el botón de eliminar
        var button = document.createElement("button");
        button.className = "delete-icon";
        // Agrega un controlador de evento clic a cada objeto delete
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            event.stopPropagation(); // Detiene la propagación del evento
            let items = document.querySelectorAll(".productos-existentes");
            const indiceClicado = Array.from(items).indexOf(article);
            article.remove();
            itemList.splice(indiceClicado, 1);
        });

        var icon = document.createElement("i");
        icon.className = "fa-solid fa-trash-can";
        button.appendChild(icon);

        // Agrega la imagen, el contenido y el botón al artículo
        article.appendChild(img);
        article.appendChild(contentDiv);
        article.appendChild(button);

        // Agrega el artículo al contenedor de productos existentes
        productosContainer.appendChild(article);

    }

    // Función para borrar el contenido de un span
    function clearErrorMessage(spanElement) {
        if (!spanElement) return;
        spanElement.textContent = "";
    }

    let allowExit = false;
    const overlay = document.getElementById('overlay');
    const toggleButton = document.getElementById('toggle-button');
    const addButton = document.getElementById("add-item-button");
    const formulario = document.getElementById("update-form");
    const deleteButtons = document.querySelectorAll(".delete-icon");
    const acceptedColors = ['Blanco', 'Negro', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Morado', 'Gris', 'Marrón', 'Rosa'];
    const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
    let itemList = [];
    let itemsDeleteList = [];

    deleteButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            event.stopPropagation(); // Detiene la propagación del evento
            const article = button.parentNode;
            const itemId = article.getAttribute("itemid");
            if (article && itemId) {
                itemsDeleteList.push(Number(itemId));
                article.remove();
            } else {
                console.error("Deleting not working.");
            }
        });
    });

    //Toggle Show/hide form items
    toggleButton.addEventListener('click', () => {
        if (overlay.style.display === 'none') {
            showItemsForm(overlay, toggleButton);
        } else {
            hideItemsForm(overlay, toggleButton);
        }
    });

    //Leaving without save
    window.addEventListener('beforeunload', async function (event) {
        if (!allowExit) event.returnValue = "???";
    });

    let propiedadesElements = document.querySelectorAll(".propiedades");

    propiedadesElements.forEach(function (propiedadesElement) {
        let inputElement = propiedadesElement.querySelector("input, textarea");
        let spanElement = propiedadesElement.querySelector(".error-message");

        if (inputElement) {
            inputElement.addEventListener("change", function () {
                clearErrorMessage(spanElement);
            });
        }

    });

    //_______________________________________AGREGAR ITEM________________________________________________________________________
    addButton.addEventListener("click", async function (event) {
        event.preventDefault();
        event.stopPropagation(); // Detiene la propagación del evento

        const imageInput = document.getElementById("image-item");
        const colorInput = document.getElementById("color");
        const stockInput = document.getElementById("stock");

        const colorValue = colorInput.value;
        const stockValue = stockInput.value;

        const image = imageInput.files[0];

        //VALIDACIONES
        let errorsFlag = false;

        //Chequear si stockValue es un numero positivo. 
        const stockErrorElement = document.getElementById("stock-error");
        if (isNaN(stockValue) || stockValue <= 0) {
            stockErrorElement.textContent = "El stock debe ser un número y positivo.";
            errorsFlag = true;
        } else {
            stockErrorElement.textContent = "";
        }

        //Chequear si el color es uno dentro de los validos.
        const colorErrorElement = document.getElementById("color-error");
        if (!colorValue || !acceptedColors.includes(colorValue)) {
            colorErrorElement.textContent = "Debe elegir un color y debe ser uno de los aceptados.";
            errorsFlag = true;
        } else {
            colorErrorElement.textContent = "";
        }

        //Chequear si la imagen existe y si existe es de la extensión correcta.
        const itemImageErrorElement = document.getElementById("itemImage-error");
        if (!image) {
            itemImageErrorElement.textContent = "Debe seleccionar una imagen.";
            errorsFlag = true;
        } else {
            const fileExtension = image.name.substring(image.name.lastIndexOf('.')).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                itemImageErrorElement.textContent = `La extensión ${fileExtension} no está permitida.`;
                errorsFlag = true;
            } else {
                itemImageErrorElement.textContent = "";
            }
        }

        if (errorsFlag) return;
        //___________________________________________________________________________________________________________

        //Limpiar los campos del formulario
        imageInput.value = "";
        colorInput.value = "Negro";
        stockInput.value = 0;

        try {

            itemList.push({
                image: image,
                stock: stockValue,
                color: colorValue
            })

            //Agregar el item para que se vea.
            showItem(colorValue, stockValue, image);

            //Ocultar formulario
            hideItemsForm(overlay, toggleButton);

        } catch (err) {
            alert("Error cargando el item.");
            console.error("Error cargando el item.", err);
        }

    });

    //_______________________________________GUARDAR________________________________________________________________________
    formulario.addEventListener("submit", async function (event) {
        event.preventDefault();
        event.stopPropagation(); // Detiene la propagación del evento

        const name = document.getElementById('name').value;
        const image = document.getElementById('image').files[0];
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const price = parseFloat(document.getElementById('price').value);

        //VALIDACIONES:
        let errorsFlag = false;

        //Validar que no se intente cargar un producto sin items.
        const itemsErrorElement = document.getElementById("items-error");
        const itemsLoaded = document.querySelectorAll('.productos-existentes');
        if (!itemsLoaded || itemsLoaded.length <= 0) {
            errorsFlag = true;
            itemsErrorElement.textContent = "- El producto debe tener al menos un item.";
        } else {
            itemsErrorElement.textContent = "";
        }

        const descriptionErrorElement = document.getElementById("description-error");
        if (!description || description.length < 15) {
            errorsFlag = true;
            descriptionErrorElement.textContent = "Debes ingresar una descripción de al menos 15 caracteres.";
        } else {
            descriptionErrorElement.textContent = "";
        }

        const priceErrorElement = document.getElementById("price-error");
        if (!price || price <= 0) {
            errorsFlag = true;
            priceErrorElement.textContent = "El precio debe ser un número positivo.";
        } else {
            priceErrorElement.textContent = "";
        }

        const nameErrorElement = document.getElementById("name-error");
        if (!name || name.length < 10) {
            errorsFlag = true;
            nameErrorElement.textContent = "Debe ingresar un nombre de al menos 10 caracteres.";
        } else {
            nameErrorElement.textContent = "";
        }

        const mainImageErrorElement = document.getElementById("mainImage-error");
        if (image) {
            const fileExtension = image.name.substring(image.name.lastIndexOf('.')).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                mainImageErrorElement.textContent = `-La extensión ${fileExtension} no está permitida.`;
                errorsFlag = true;
            } else {
                mainImageErrorElement.textContent = "";
            }
        }

        if (errorsFlag) return;
        //___________________________________________________________________________________

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('updatedImage', image);

        // Agregar las imágenes del itemList al FormData
        for (const item of itemList) {
            formData.append('itemImg', item.image);
        }

        const itemsToSend = itemList.map(item => ({
            color: item.color,
            stock: item.stock
        }));

        formData.append('items', JSON.stringify(itemsToSend));

        formData.append('deleteItems', JSON.stringify(itemsDeleteList));

        const response = await fetch(window.location.pathname.replace("editar", "actualizar"), {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const responseData = await response.json();
            responseData.forEach(error => {
                const errorElement = document.getElementById(`${error.path}-error`);
                if (errorElement) {
                    errorElement.textContent = error.msg;
                }
            });
            return;
        }

        allowExit = true;
        window.location.href = '/admin';
    });

};