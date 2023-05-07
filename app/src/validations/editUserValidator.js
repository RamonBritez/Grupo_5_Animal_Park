const { check, body } = require("express-validator");


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
        
        body("tel")
        .custom((value, { req }) => {
            if (value !== "") {
                let regExNum = /^[-]?[0-9]+[\.]?[0-9]+$/
                if (!regExNum.test(value)) {
                    return false
                }
                return true
            }
            return true
        })
        .withMessage("Ingrese solamente caracteres numericos")

]