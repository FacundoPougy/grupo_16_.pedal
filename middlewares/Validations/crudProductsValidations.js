const {
    body
} = require('express-validator');

const allowedCategories = ['Bicicleta', 'Accesorio'];
const acceptedColors = ['Blanco', 'Negro', 'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Morado', 'Gris', 'Marrón', 'Rosa'];
const acceptedExtensions = ['.jpg', '.jpeg', '.png'];


const productValidations = {
    productChecks: [
        body('name')
        .trim()
        .notEmpty().withMessage('Debes ingresar un nombre para el producto!')
        .bail()
        .isLength({
            min: 10
        }).withMessage('El nombre debe tener al menos 10 caracteres'),

        body('description')
        .trim()
        .notEmpty().withMessage('Debes ingresar una descripción!')
        .bail()
        .isLength({
            min: 15
        }).withMessage('La descripción debe tener al menos 15 caracteres'),

        body('price')
        .notEmpty().withMessage('Debes ingresar un precio!')
        .bail()
        .isFloat({
            min: 0
        }).withMessage('El precio debe ser un número positivo'),

        body('category')
        .custom((value) => {
            if (!allowedCategories.includes(value)) {
                throw new Error('Categoría no válida');
            }
            return true;
        }),

        // Checking the files
        body().custom((value, {
            req
        }) => {
            const itemsLength = JSON.parse(value.items).length;
            const uploadedFiles = req.files;

            // Check extension and count
            if (uploadedFiles.length !== itemsLength + 1) {
                throw new Error('El numero de imagenes subido no es suficiente.');
            }

            uploadedFiles.forEach(file => {
                const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`La extensión ${fileExtension} no está permitida.`);
                }
            });

            return true;
        }),

        body('items').custom((value) => {
            const items = JSON.parse(value);

            if (items.length === 0) {
                throw new Error("El producto debe tener al menos un item.");
            }

            for (const item of items) {
                const stock = parseInt(item.stock);

                if (isNaN(stock) || stock <= 0) {
                    throw new Error("El stock debe ser un número entero mayor a 0.");
                }

                if (!acceptedColors.includes(item.color)) {
                    throw new Error("Color no válido.");
                }
            }

            return true;
        }),


    ]
};

module.exports = productValidations;