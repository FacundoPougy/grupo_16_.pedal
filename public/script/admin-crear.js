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
    }

    function showItem(color, stock, imagen) {
        // Obtén una referencia al contenedor de productos existentes
        let productosContainer = document.getElementById("items-container");

        // Crea el artículo de productos existentes
        let article = document.createElement("article");
        article.className = "productos-existentes";

        // Crea la imagen del producto
        const imageUrl = URL.createObjectURL(imagen);
        let img = document.createElement("img");
        img.id = "img-n" + itemList.length;
        img.className = "img-producto";
        img.src = imageUrl;
        img.alt = "Bicicleta";

        // Crea el contenedor de contenido de productos existentes
        let contentDiv = document.createElement("div");
        contentDiv.className = "productos-existentes-content";

        // Crea los elementos de párrafo para color y stock
        let colorParagraph = document.createElement("p");
        colorParagraph.textContent = "Color: " + color;
        let stockParagraph = document.createElement("p");
        stockParagraph.textContent = "Stock: " + stock;

        // Agrega los párrafos al contenedor de contenido
        contentDiv.appendChild(colorParagraph);
        contentDiv.appendChild(stockParagraph);

        // Crea el botón de eliminar
        let button = document.createElement("button");
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

        let icon = document.createElement("i");
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
        spanElement.textContent = "";
    }

    let allowExit = false;
    const overlay = document.getElementById('overlay');
    const toggleButton = document.getElementById('toggle-button');
    const addButton = document.getElementById("add-item-button");
    const submitButton = document.getElementById('crear-product');
    let itemList = [];

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

        const imageInput = document.getElementById("image-item");
        const colorInput = document.getElementById("color");
        const stockInput = document.getElementById("stock");

        const colorValue = colorInput.value;
        const stockValue = stockInput.value;

        const image = imageInput.files[0];

        //VALIDACIONES
        if (!colorValue || !stockValue || !image) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        //Chequear si stockValue no es un numero positivo, si la imagen no tiene cierta extension y si el color no es uno dentro de los validos.
        if (!colorValue || !stockValue || !image) {
            alert("Por favor, complete todos los campos.");
            return;
        }



        //___________________________________________________________________________________________________________

        //Limpiar los campos del formulario
        imageInput.value = "";
        colorInput.value = "Negro";
        stockInput.value = "";

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

    //_______________________________________CREAR________________________________________________________________________
    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation(); // Detiene la propagación del evento

        const name = document.getElementById('name').value;
        const image = document.getElementById('image').files[0];
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const price = parseFloat(document.getElementById('price').value);

        //VALIDACIONES:

        //Validar que no se intente cargar un producto sin items.
        if (itemList.length === 0) {
            return;
        }


        //__________________________________________________________________________

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('mainImage', image);

        // Agregar las imágenes del itemList al FormData
        for (const item of itemList) {
            formData.append('itemImg', item.image);
        }

        const itemsToSend = itemList.map(item => ({
            color: item.color,
            stock: item.stock
        }));

        formData.append('items', JSON.stringify(itemsToSend));

        const response = await fetch('/admin', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const responseData = await response.json();
            responseData.forEach(error => {
                const errorElement = document.getElementById(`${error.path}-error`);
                console.log(errorElement);
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