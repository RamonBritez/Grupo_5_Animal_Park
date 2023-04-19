const { check, body } = require("express-validator");


module.exports = [
    check("userName")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")

]