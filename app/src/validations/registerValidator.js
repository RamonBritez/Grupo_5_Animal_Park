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

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom((value) => {
        let user = users.find(user => user.email === value);

        return user === undefined;
    })
    .withMessage("Email ya registrado"),

    check('password')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 6,
    })
    .withMessage('La contraseña debe tener como mínimo 6'),

    body('repeatPassword')
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]