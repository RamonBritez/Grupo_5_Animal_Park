const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

let users = readJSON("usersDB.json")
module.exports = {
    login: (req, res) => {
        res.render("users/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.userName,
                avatar: user.avatar,
                rol: user.rol
            }

            let tiempoDecookies = new Date(Date.now() + 60000);

            if(req.body.recordar){
                res.cookie("userAnimalPark", 
                req.session.user,
                {
                    expires: tiempoDecookies,
                    httpOnly: true                 
                })
            }

            res.locals.user = req.session.user;

            res.redirect("/");
        }  else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render("users/register", {session: req.session})
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
            
            let {userName, apellido, email, password} = req.body;

            let newUser = {
             id: lastId + 1,
             userName,
             apellido,
             email,
             password,
             avatar: req.file ? req.file.filename : "avatar_default.jpeg",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
            };
     
            users.push(newUser);
     
            writeJSON("usersDB.json", users);
     
            res.redirect('/users/login');
            } else {
            res.render("users/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    logout : (req, res) => {
        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie("userAnimalPark", "", {maxAge: -1})
        }

        res.redirect("/");
    }
}