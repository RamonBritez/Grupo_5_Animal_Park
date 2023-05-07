const { check, body } = require("express-validator");
const { User } = require("../database/models");

module.exports = [
    check("userName")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isAlpha()
    .withMessage("Ingrese solamente caracteres alfabeticos"),

    check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isAlpha()
    .withMessage("Ingrese solamente caracteres alfabeticos"),

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