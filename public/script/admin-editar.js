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

    let allowExit = false;
    const overlay = document.getElementById('overlay');
    const toggleButton = document.getElementById('toggle-button');
    const addButton = document.getElementById("add-item-button");
    const formulario = document.getElementById("update-form");
    const deleteButtons = document.querySelectorAll(".delete-icon");
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