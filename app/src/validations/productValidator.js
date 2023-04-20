const { check } = require("express-validator");

module.exports = [
    check("brand")
        .notEmpty().withMessage("Indica la marca que buscas").bail()
        .isNumeric().withMessage("No es un numero"),

    check("name")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({ min: 3, max: 25 }).withMessage("El nombre debe tener entre 3 y 20 caracteres"),

    check("category")
        .notEmpty().withMessage("Debes indicar la categoría"),
    
    check("pet")
        .notEmpty().withMessage("Debes indicar el animal"),

    check("description")
        .notEmpty().withMessage("La descripción es obligatoria").bail()
        .isLength({ min: 10}).withMessage("La descripción debe tener mínimo 10 caracteres"),
    
    check("price")
        .isInt({min:1}).withMessage("Debes indicar un precio"),

    check("discount")
        .isInt({min:0,max:99}).withMessage("El descuento no puede ser más del 100%"),
    
    check("weight")
        .isInt({min:0,max:50}).withMessage("El limite es de 50kg")
];
