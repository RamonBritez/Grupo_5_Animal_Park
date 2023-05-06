const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models"); 


module.exports = [

    body("password")
    .custom((value, { req }) => {
        return User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.pass)) {
                return Promise.reject();
            }
        })
        .catch(() => Promise.reject("Email o contraseña incorrecto"))
    }) 
]

