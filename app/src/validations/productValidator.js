const { check } = require("express-validator");

module.exports = [
    check("brand")
        .isInt().withMessage("Indica la marca que buscas").bail()
        .notEmpty().withMessage("Indica la marca que buscas"),
        
    check("category")
        .isInt().withMessage("Debes indicar la categoría").bail()
        .notEmpty().withMessage("Debes indicar la categoría"),
        
    check("pet")
        .isInt().withMessage("Debes indicar el animal").bail()
        .notEmpty().withMessage("Debes indicar el animal"),

    check("name")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({ min: 3, max: 25 }).withMessage("El nombre debe tener entre 3 y 20 caracteres"),


    check("description")
        .notEmpty().withMessage("La descripción es obligatoria").bail()
        .isLength({ min: 10}).withMessage("La descripción debe tener mínimo 10 caracteres"),
    
    check("price")
        .notEmpty().withMessage("Debes indicar un precio").bail()
        .isFloat({min:1}).withMessage("No regales tus productos"),

    check("discount")
        .isInt({min:0,max:99}).withMessage("El descuento no puede ser más del 100%"),
    
    check("weight")
        .isFloat({min:0,max:100}).withMessage("El limite es de 100kg")
];
