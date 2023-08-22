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

    function showItem(color, stock, imagenSrc) {
        // Obtén una referencia al contenedor de productos existentes
        var productosContainer = document.getElementById("items-container");

        // Crea el artículo de productos existentes
        var article = document.createElement("article");
        article.className = "productos-existentes";

        // Crea la imagen del producto
        var img = document.createElement("img");
        img.id = "img-n" + itemList.length;
        img.className = "img-producto";
        img.src = imagenSrc;
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

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function uploadImage(formData) {

        const response = await fetch('/admin/image', {
            method: 'POST',
            body: formData
        })

        return await response.text();
    }

    let allowExit = false;
    const overlay = document.getElementById('overlay');
    const toggleButton = document.getElementById('toggle-button');
    const addButton = document.getElementById("add-item-button");
    const formulario = document.getElementById("update-form");
    let itemList = [];
    let itemsDeleteList = [];
    const deleteButtons = document.querySelectorAll(".delete-icon");

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

    //AGREGAR ITEM
    addButton.addEventListener("click", async function (event) {

        const imageInput = document.getElementById("image-item");
        const colorInput = document.getElementById("color");
        const stockInput = document.getElementById("stock");

        const imageValue = imageInput.value;
        const colorValue = colorInput.value;
        const stockValue = stockInput.value;

        const image = imageInput.files[0];

        //VALIDACIONES
        if (!imageValue || !colorValue || !stockValue || !image) {
            alert("Por favor, complete todos los campos.");
            return;
        }


        //___________________________________________________________________________________________________________

        //Limpiar los campos del formulario
        imageInput.value = "";
        colorInput.value = "";
        stockInput.value = "";

        try {
            // Subo la imagen preview al servidor
            const formData = new FormData();
            formData.append('image', image);
            const imagePath = await uploadImage(formData);

            //itemImages.push(formData);

            itemList.push({
                image: formData,
                stock: stockValue,
                color: colorValue
            })

            //Agregar el item para que se vea.
            showItem(colorValue, stockValue, imagePath);

            //Ocultar formulario
            hideItemsForm(overlay, toggleButton);

            // Esperar a que la imagen se cargue completamente
            await delay(1000); // Espera 1 segundo

            //Elimino la imagen preview del servidor.
            const formInfo = new FormData();
            formInfo.append('items', JSON.stringify([{
                image: imagePath
            }]));

            await fetch('/admin/deleteImage', {
                method: 'POST',
                body: formInfo,
            });

        } catch (err) {
            alert("Error cargando el item.");
            console.error("Error cargando el item.", err);
        }

    });

    //GUARDAR
    formulario.addEventListener("submit", async function () {
        allowExit = true;

        //Post items in itemlist and delete items in itemsDeleteList
        let itemsToPost = [];
        if (itemList.length > 0) {
            for (const item of itemList) {
                const {
                    image,
                    stock,
                    color
                } = item;
                const imagePathFinal = await uploadImage(image);
                itemsToPost.push({
                    image: imagePathFinal,
                    stock,
                    color
                });
            }

            const formInfo = new FormData();
            formInfo.append('items', JSON.stringify(itemsToPost));

            await fetch(window.location.pathname.replace("editar", "items"), {
                method: 'POST',
                body: formInfo,
            });
        }

        //Delete list
        for (const id of itemsDeleteList) {
            console.log(id);
            /*
            deleteItemAndRelated


            // Eliminar los items
            await Item.destroy({
            where: {
            product_id: id
            }
            });
            
            */
        }

    });

};