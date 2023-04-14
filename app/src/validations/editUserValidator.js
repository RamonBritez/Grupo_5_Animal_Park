const { check, body } = require("express-validator");
const { readJSON} = require("../old_database");

let users = readJSON("usersDB.json");

module.exports = [
    check("userName")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")

]