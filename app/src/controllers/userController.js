const { validationResult } = require("express-validator");
const fs = require('fs');
const { readJSON, writeJSON } = require("../database");
const bcrypt = require("bcryptjs");
const session = require("express-session");


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
                rol: user.rol,
                email: user.email,
            }

            let tiempoDecookies = new Date(Date.now() + 60000);
            //Modifique res.cookie "userAnimalPark" a "AnimalPark" y agregue en la session el email(linea 25)
            if(req.body.recordar){
                res.cookie("AnimalPark", 
                req.session.user,
                {
                    expires: tiempoDecookies,
                    httpOnly: true                 
                })
            }

            res.locals.user = req.session.user;
            res.redirect("/")

          /*  if(req.session.user.rol !== "ADMIN"){
                res.redirect("/");
            }else {
                res.redirect("/admin")
            }*/
            
        }  else {
            return res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render("users/register")
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
             password:  bcrypt.hashSync(password, 12),
             avatar: req.file ? req.file.filename : "avatar_default.jpeg",
             rol: "USER",
             tel: "",
             address: "",
             postal_code:"",
             province:"",
             city:""

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
        if(req.cookies.userAnimalpark){
            res.cookie("userAnimalPark", "", {maxAge: -1})
        }

        res.redirect("/");
    },
    profile: (req, res) => {
        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);

        res.render("users/userProfile", {
            user: userInSession,
            session: req.session
        })
    },

    edit:(req, res) =>{
        let userId = req.session.user.id;
        let userToEdit = users.find(user  => user.id === userId);
        
        res.render('users/editUser',{
            session: req.session,
            user: userToEdit
        })
    },

   
    processEdit: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.session.user.id;
            let user = users.find(user => user.id === userId);

            const {
                userName,
                apellido,
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;

            user.userName = userName;
            user.apellido = apellido;
            user.tel = tel;
            user.address = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;

            writeJSON("usersDB.json", users);

            delete user.pass;

            req.session.user = user;

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

            return res.render("users/editUser", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }
}