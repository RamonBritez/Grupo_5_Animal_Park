const { check, body } = require("express-validator");
const { User } = require("../database/models");

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
    .custom( (value, { req }) => {
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Email ya registrado")
        })
        .catch(error => console.log(error))
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