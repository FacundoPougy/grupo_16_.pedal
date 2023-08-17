window.onload = function () {

    let allowExit = false;
    const overlay = document.getElementById('overlay');
    const toggleButton = document.getElementById('toggle-button');
    const addButton = document.getElementById("add-item-button");
    const submitButton = document.getElementById('crear-product');
    let itemList = [];


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

    function showItem(color, stock, imagenSrc) {
        // Obtén una referencia al contenedor de productos existentes
        var productosContainer = document.getElementById("items-container");

        // Crea el artículo de productos existentes
        var article = document.createElement("article");
        article.className = "productos-existentes";

        // Crea la imagen del producto
        var img = document.createElement("img");
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
            let items = document.querySelectorAll(".productos-existentes");
            const indiceClicado = Array.from(items).indexOf(article);
            article.remove();
            const formInfo = new FormData();
            formInfo.append('items', JSON.stringify([itemList[indiceClicado]]));
            await fetch('/admin/deleteImage', {
                method: 'POST',
                body: formInfo,
            });
            itemList.splice(indiceClicado, 1);

        });

        var icon = document.createElement("i");
        icon.className = "fa-solid fa-trash-can";
        button.appendChild(icon);

        // Crea el botón de actualizar
        /*
        var button = document.createElement("button");
        button.className = "delete-icon";
        var icon = document.createElement("i");
        icon.className = "fa-solid fa-trash-can";
        button.appendChild(icon);
        */

        // Agrega la imagen, el contenido y el botón al artículo
        article.appendChild(img);
        article.appendChild(contentDiv);
        article.appendChild(button);

        // Agrega el artículo al contenedor de productos existentes
        productosContainer.appendChild(article);

    }

    addButton.addEventListener("click", async function (event) {

        const imageInput = document.getElementById("image-item");
        const colorInput = document.getElementById("color");
        const stockInput = document.getElementById("stock");

        const imageValue = imageInput.value;
        const colorValue = colorInput.value;
        const stockValue = stockInput.value;

        const image = imageInput.files[0];

        if (imageValue && colorValue && stockValue) {

            //Limpiar los campos del formulario
            imageInput.value = "";
            colorInput.value = "";
            stockInput.value = "";

            const formData = new FormData();
            formData.append('image', image);

            // Perform a POST request using Fetch or another method

            try {
                const response = await fetch('/admin/image', {
                    method: 'POST',
                    body: formData
                })
                const imagePath = await response.text();

                itemList.push({
                    image: imagePath,
                    stock: stockValue,
                    color: colorValue
                })

                //Ocultar formulario
                hideItemsForm(overlay, toggleButton);

                //Agregar el item para que se vea.
                showItem(colorValue, stockValue, imagePath);
            } catch (err) {
                alert("Error cargando el item.");
            }

        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').files[0];
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const price = parseFloat(document.getElementById('price').value);

        // Here, you can perform any additional processing on the data before sending it

        const data = {
            name: name,
            description: description,
            category: category,
            price: price,
            // Add any other properties you want to send
        };

        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        formData.append('image', image);
        formData.append('items', JSON.stringify(itemList));

        // Perform a POST request using Fetch or another method
        const response = await fetch('/admin', {
            method: 'POST',
            body: formData,
        })

        allowExit = true;

        window.location.href = '/admin';


        /*
        const formInfo = new FormData();
        formInfo.append('items', JSON.stringify(itemList));
        
        const responseT = await fetch('/admin/deleteImage', {
            method: 'POST',
            body: formInfo,
        });
        */

    });

    window.addEventListener('beforeunload', async function (event) {
        event.preventDefault();
        if (!allowExit) {
            //event.returnValue = ""
            const formInfo = new FormData();
            formInfo.append('items', JSON.stringify(itemList));

            await fetch('/admin/deleteImage', {
                method: 'POST',
                body: formInfo,
            });

        }
    });




};