const { check, body } = require("express-validator");
const { User } = require("../database/models");

module.exports = [
    body("userName")
        .notEmpty().withMessage('El nombre es obligatorio')
        .custom((value, { req }) => {
            if (value !== "") {
                let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
                if (!regExAlpha.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres alfabeticos"),

    body("apellido")
        .notEmpty().withMessage('El apellido es obligatorio')
        .custom((value, { req }) => {
            if (value !== "") {
                let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
                if (!regExAlpha.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres alfabeticos"),


    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido")
    .custom(value => {
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) {return Promise.reject("Email ya registrado")}
        })
        .catch(error => {
            console.log(error);
            return Promise.reject("Error en la validación del email");
        });
    }).withMessage("Email ya registrado"),

    check('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min: 6,
        max: 12,
    })
    .withMessage('Debe ingresar una contraseña de 6 a 12 caracteres'),

    body('repeatPassword')
    .notEmpty()
    .withMessage('Debes reingresar la contraseña').bail()
    .custom((value, {req}) => value !== req.body.password ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('checkTerms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones'),

]