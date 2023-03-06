const { check, body } = require("express-validator");
const { readJSON} = require("../database");

let users = readJSON("usersDB.json");

module.exports = [
    check("userName")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),
  
    check("tel")
    .notEmpty()
    .withMessage("Dato para envio requerido").bail()    
    .isLength({
        min: 8,
    })
    .withMessage('Ingrese un contacto para envios'),
   
    check("address")
    .notEmpty()
    .withMessage("Dato para envio requerido"),

    check("postal_code")
    .notEmpty()
    .withMessage("Dato para envio requerido"),

    check("province")
    .notEmpty()
    .withMessage("Dato para envio requerido"),

    check("city")
    .notEmpty()
    .withMessage("Dato para envio requerido")

]