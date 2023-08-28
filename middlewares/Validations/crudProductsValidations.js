const {
    body
} = require('express-validator');

const allowedCategories = ['Bicicleta', 'Accesorio'];


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
            console.log(value);
            if (!allowedCategories.includes(value)) {
                throw new Error('Categoría no válida');
            }
            return true;
        })

    ]
};

module.exports = productValidations;