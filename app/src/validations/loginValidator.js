const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");
const { getUserByEmail } = require("../services/user.service");


module.exports = [
    body("password")
        .custom((value, { req }) => {
            return getUserByEmail(req.body.email)
                .then((user) => {
                    if (!bcrypt.compareSync(value, user.pass)) {
                        return Promise.reject();
                    }
                })
                .catch(() => Promise.reject("Email o contraseña incorrecto"))
        })
]

